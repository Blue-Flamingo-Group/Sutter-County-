#!/usr/bin/env bash
# Deploy the Yes on Measure G page to Vercel (review link for the client).
# Mirrors ~/dev/fire-template. Scope: syronius-projects. Project: measure-g.
#
# When the committee confirms the real host (SafeSutterYesOnG.com or wherever
# their DNS lands), copy fire-template's deploy-droplet.sh pattern and rsync
# this directory up instead — exclude _verify/, .vercel/, assets/img/_originals/.
set -euo pipefail
cd "$(dirname "$0")"

vercel --prod --yes

echo "--- verify ---"
URL="$(vercel ls measure-g --scope syronius-projects 2>/dev/null | grep -o 'https://[^ ]*' | head -1 || true)"
if [ -n "$URL" ]; then
  curl -s -o /dev/null -w "$URL -> %{http_code}\n" "$URL"
fi
