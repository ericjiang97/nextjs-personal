export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./scripts/node27-http-headers-compat.cjs')
  }
}
