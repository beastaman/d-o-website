import { createRef } from 'react';
import type { ToasterRef } from '@/components/ui/toast';

export const globalToasterRef = createRef<ToasterRef>();

type ShowProps = Parameters<ToasterRef['show']>[0];

export function showToast(props: ShowProps) {
  globalToasterRef.current?.show(props);
}
