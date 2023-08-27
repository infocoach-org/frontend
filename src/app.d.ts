// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type AccountInfo from "$lib/shared/domain/account_info";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      accountInfo?: AccountInfo;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
