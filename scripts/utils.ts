import { resolve } from 'node:path'
import { bgCyan, black } from 'kolorist'

/* eslint-disable unicorn/prefer-number-properties, n/prefer-global/process */
export const port = parseInt(process.env.PORT || '') || 3303
export const r = (...args: string[]) => resolve(__dirname, '..', ...args)
export const isDev = process.env.NODE_ENV !== 'production'
export const isFirefox = process.env.EXTENSION === 'firefox'

export function log(name: string, message: string) {
  console.log(black(bgCyan(` ${name} `)), message)
}
