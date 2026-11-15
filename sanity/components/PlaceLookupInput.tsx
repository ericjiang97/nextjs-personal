'use client'

import React, { useState } from 'react'
import { ObjectInputProps, PatchEvent, set } from 'sanity'
import type { PlaceCandidate } from '../../types/places'

function parseCoordsFromUrlOrString(
  raw: string
): { lat: number; lng: number; name?: string } | null {
  const trimmed = raw.trim()
  // Match Google Maps @lat,lng pattern e.g. /@35.6612,139.701,17z
  const atMatch = trimmed.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
  if (atMatch) {
    const lat = Number(atMatch[1])
    const lng = Number(atMatch[2])
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      const placeMatch = trimmed.match(/\/place\/([^/@?]+)/)
      const decodedName = placeMatch
        ? decodeURIComponent(placeMatch[1].replace(/\+/g, ' '))
        : undefined
      return { lat, lng, name: decodedName }
    }
  }
  // Match plain "lat, lng"
  const pairMatch = trimmed.match(/^(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)$/)
  if (pairMatch) {
    const lat = Number(pairMatch[1])
    const lng = Number(pairMatch[2])
    if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
      return { lat, lng }
    }
  }
  return null
}

export function PlaceLookupInput(props: ObjectInputProps) {
  const { onChange, renderDefault, value } = props
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'all' | 'restaurant' | 'city'>('all')
  const [results, setResults] = useState<PlaceCandidate[]>([])
  const [loading, setLoading] = useState(false)
  const [searchedOnce, setSearchedOnce] = useState(false)

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    // Check if user pasted a Google Maps URL or lat,lng pair directly
    const parsed = parseCoordsFromUrlOrString(trimmed)
    if (parsed) {
      const patches = [
        set(Number(parsed.lat.toFixed(6)), ['lat']),
        set(Number(parsed.lng.toFixed(6)), ['lng']),
      ]
      if (parsed.name && !value?.name) {
        patches.push(set(parsed.name, ['name']))
      }
      if (trimmed.startsWith('http')) {
        patches.push(set(trimmed, ['externalUrl']))
      }
      onChange(PatchEvent.from(patches))
      setQuery('')
      setResults([])
      return
    }

    setLoading(true)
    setSearchedOnce(true)
    try {
      const params = new URLSearchParams({ q: trimmed, category })
      const res = await fetch(`/api/places/search?${params.toString()}`)
      const data = (await res.json()) as { results?: PlaceCandidate[] }
      setResults(data.results || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const applyCandidate = (candidate: PlaceCandidate) => {
    const patches = [
      set(candidate.name, ['name']),
      set(candidate.subtitle, ['subtitle']),
      set(candidate.address, ['address']),
      set(candidate.country, ['country']),
      set(candidate.lat, ['lat']),
      set(candidate.lng, ['lng']),
      set(candidate.primaryTag, ['primaryTag']),
      set(candidate.tags, ['tags']),
    ]
    if (candidate.cuisine) {
      patches.push(set(candidate.cuisine, ['cuisine']))
    }
    if (candidate.externalUrl) {
      patches.push(set(candidate.externalUrl, ['externalUrl']))
    }
    onChange(PatchEvent.from(patches))
    setResults([])
    setQuery('')
    setSearchedOnce(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div
        style={{
          padding: '12px 14px',
          borderRadius: '8px',
          border: '1px solid rgba(125, 125, 140, 0.28)',
          background: 'rgba(14, 165, 233, 0.06)',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Quick Lookup (OpenStreetMap Search or Paste Google Maps Link)</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['all', 'restaurant', 'city'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  padding: '2px 8px',
                  fontSize: '11px',
                  borderRadius: '999px',
                  border: '1px solid rgba(125,125,140,0.3)',
                  background:
                    category === cat ? 'rgba(14, 165, 233, 0.25)' : 'transparent',
                  color: 'inherit',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearch()
              }
            }}
            placeholder="e.g. Ichiran Shibuya, Lune Croissanterie Melbourne, Kyoto, or Google Maps URL..."
            style={{
              flex: 1,
              padding: '7px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(125, 125, 140, 0.35)',
              background: 'transparent',
              color: 'inherit',
              fontSize: '13px',
            }}
          />
          <button
            type="button"
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            style={{
              padding: '7px 14px',
              borderRadius: '6px',
              border: 'none',
              background: '#0ea5e9',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading || !query.trim() ? 0.6 : 1,
            }}
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>

        {results.length > 0 && (
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              maxHeight: '220px',
              overflowY: 'auto',
            }}
          >
            {results.map((r) => (
              <button
                key={r.externalId}
                type="button"
                onClick={() => applyCandidate(r)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(125, 125, 140, 0.25)',
                  background: 'rgba(0, 0, 0, 0.12)',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>
                    {r.name}{' '}
                    <span
                      style={{
                        fontSize: '10px',
                        opacity: 0.75,
                        textTransform: 'uppercase',
                        marginLeft: '4px',
                      }}
                    >
                      [{r.primaryTag}]
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', opacity: 0.75 }}>
                    {r.subtitle} ({r.lat.toFixed(4)}, {r.lng.toFixed(4)})
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#38bdf8',
                    marginLeft: '8px',
                  }}
                >
                  Auto-fill
                </span>
              </button>
            ))}
          </div>
        )}

        {searchedOnce && !loading && results.length === 0 && (
          <div style={{ marginTop: '8px', fontSize: '11px', opacity: 0.75 }}>
            No matches found — try a broader search or enter coordinates manually below.
          </div>
        )}
      </div>

      {renderDefault(props)}
    </div>
  )
}
