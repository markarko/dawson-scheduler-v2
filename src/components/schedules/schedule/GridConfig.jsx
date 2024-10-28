import React from 'react';

export function useGridConfig(scale) {
  return React.useMemo(() => ({
    tdHeight: 5 * scale,
    tdWidth: 20 * scale,
  }), [scale]);
}
