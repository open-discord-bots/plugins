///////////////////////////////////////
//TWITCH NOTIFIER - TWITCH API
///////////////////////////////////////
import { opendiscord } from "#opendiscord";

/**## HelixUser `interface`
 * Twitch user data from the Helix API.
 */
export interface HelixUser {
  /**The Twitch user ID (immutable). */
  id: string;
  /**The user's login name (can change). */
  login: string;
  /**The user's display name. */
  display_name: string;
  /**URL to the user's profile image. */
  profile_image_url: string;
}

/**## HelixStream `interface`
 * Twitch stream data from the Helix API.
 */
export interface HelixStream {
  /**The stream ID. */
  id: string;
  /**The broadcaster's user ID. */
  user_id: string;
  /**The broadcaster's login name. */
  user_login: string;
  /**The game/category name being streamed. */
  game_name: string;
  /**The stream title. */
  title: string;
  /**Current viewer count. */
  viewer_count: number;
  /**Stream thumbnail URL template. */
  thumbnail_url: string;
  /**ISO timestamp when stream started. */
  started_at: string;
  /**The game ID (optional). */
  game_id?: string;
}

/**## HelixGame `interface`
 * Twitch game/category data from the Helix API.
 */
export interface HelixGame {
  /**The game ID. */
  id: string;
  /**The game name. */
  name: string;
  /**URL template for the game's box art. */
  box_art_url: string;
}

type HelixHttpError = {
  error: string;
  status: number;
  message: string;
};

/**## HelixError `class`
 * Custom error class for Twitch Helix API errors.
 *
 * Contains the HTTP status code and optional Twitch error details.
 */
export class HelixError extends Error {
  constructor(
    /**The HTTP status code. */
    public readonly status: number,
    /**The Twitch API error details. */
    public readonly twitchError?: HelixHttpError,
  ) {
    super(twitchError?.message ?? `Helix request failed with ${status}`);
    this.name = "HelixError";
    Object.setPrototypeOf(this, HelixError.prototype);
  }
}

/**## TwitchApi `class`
 * Wrapper for the Twitch Helix API.
 *
 * Handles app token authentication and provides methods for fetching
 * users, streams, and games from the Twitch API.
 */
export class TwitchApi {
  /**The Twitch application client ID. */
  private clientId: string;
  /**The Twitch application client secret. */
  private clientSecret: string;
  /**The current app access token. */
  private appToken: string | null = null;
  /**Timestamp when the token expires. */
  private tokenExpiresAt = 0;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**Fetch or refresh the Twitch app access token. */
  private async fetchAppToken() {
    if (this.appToken && Date.now() < this.tokenExpiresAt - 60_000) return this.appToken;
    const body = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials",
    });
    const resp = await fetch("https://id.twitch.tv/oauth2/token", { method: "POST", body });
    const json = (await resp.json()) as any;
    if (!resp.ok) {
      opendiscord.log("Failed to get Twitch app token", "plugin", [{ key: "status", value: String(resp.status) }]);
      throw new Error("twitch_token" + JSON.stringify(json));
    }
    this.appToken = json.access_token;
    this.tokenExpiresAt = Date.now() + json.expires_in * 1000;
    return this.appToken!;
  }

  /**Make a request to the Twitch Helix API. */
  private async helix<T>(path: string, query: Record<string, string | string[]>, retried = false): Promise<T> {
    const token = await this.fetchAppToken();
    const usp = new URLSearchParams();
    for (const k in query) {
      const v = query[k];
      if (Array.isArray(v)) v.forEach((x) => usp.append(k, x));
      else usp.append(k, v);
    }

    const resp = await fetch(`https://api.twitch.tv/helix/${path}?${usp.toString()}`, {
      headers: { "Client-ID": this.clientId, Authorization: `Bearer ${token}` },
    });

    //retry once with fresh token on 401
    if (resp.status === 401 && !retried) {
      this.appToken = null;
      this.tokenExpiresAt = 0;
      return this.helix<T>(path, query, true);
    }

    if (resp.status === 429) {
      opendiscord.log("Twitch rate limit hit", "plugin", [
        { key: "ratelimit", value: resp.headers.get("Ratelimit-Remaining") || "?" },
        { key: "reset", value: resp.headers.get("Ratelimit-Reset") || "?" },
        { key: "limit", value: resp.headers.get("Ratelimit-Limit") || "?" },
      ]);
    }

    const body = await resp.json().catch(() => {
      throw new HelixError(resp.status);
    });

    if (!resp.ok) {
      const maybeErr = body as Partial<HelixHttpError>;
      throw new HelixError(resp.status, {
        error: String(maybeErr.error ?? "Error"),
        status: Number(maybeErr.status ?? resp.status),
        message: String(maybeErr.message ?? "Helix error"),
      });
    }

    return body as T;
  }

  /**Fetch users by their login names. */
  async getUsersByLogin(logins: string[]): Promise<HelixUser[]> {
    if (logins.length === 0) return [];
    const data = await this.helix<{ data: HelixUser[] }>("users", { login: logins });
    return data.data;
  }

  /**Fetch users by their IDs. */
  async getUsersByIds(ids: string[]): Promise<HelixUser[]> {
    if (ids.length === 0) return [];
    const data = await this.helix<{ data: HelixUser[] }>("users", { id: ids });
    return data.data;
  }

  /**Fetch live streams by user IDs. */
  async getStreamsByUserIds(ids: string[]): Promise<HelixStream[]> {
    if (ids.length === 0) return [];
    const data = await this.helix<{ data: HelixStream[] }>("streams", { user_id: ids });
    return data.data;
  }

  /**Fetch games by their names. */
  async getGamesByNames(names: string[]): Promise<HelixGame[]> {
    if (names.length === 0) return [];
    const data = await this.helix<{ data: HelixGame[] }>("games", { name: names });
    return data.data;
  }
}
