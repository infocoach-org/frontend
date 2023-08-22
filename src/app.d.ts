// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type JWTUserData from "$lib/shared/domain/user_data";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      userData?: JWTUserData;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
