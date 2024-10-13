import { useMediaQuery } from '@mantine/hooks';

function useIsMobile() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return isMobile;
}

export default useIsMobile;
