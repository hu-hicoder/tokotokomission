'use client'

import { usePlacesContext } from "@/context/PlacesContext";

export const PlaceSearch = () => {
  const { loading, error, handleGetCurrentPosition } = usePlacesContext();

  return (
    <div>
      <button 
        onClick={handleGetCurrentPosition}
        disabled={loading}
      >
        {loading ? '読み込み中...' : '現在地を取得して近くのカフェを検索'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
