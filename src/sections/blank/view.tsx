'use client';

import {
  motion,
  type HTMLMotionProps,
  type Variants,
  LazyMotion,
  domAnimation,
  m,
} from 'framer-motion';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { cubicEasingFn } from 'src/utils/easings';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { memo, useState } from 'react';
import {} from 'framer-motion';
import { EditorPanel } from './EditorPanel';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
};

interface ViewProps extends HTMLMotionProps<'div'> {
  children: JSX.Element;
}

const View = memo(({ children, ...props }: ViewProps) => (
  <motion.div className="absolute inset-0" transition={viewTransition} {...props}>
    {children}
  </motion.div>
));

const viewTransition = { ease: cubicEasingFn };

export function BlankView({ title = 'Blank' }: Props) {
  const [selectedView, setSelectedView] = useState('code');
  return (
    <DashboardContent maxWidth="xl">
      {/* <Typography variant="h4"> {title} </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
          border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
        }}
      /> */}

      <div className="h-full flex flex-col  border  shadow-sm  overflow-hidden bg-gray-500">
        {/* <div className="relative flex-1 overflow-hidden">
          <EditorPanel />
        </div> */}
        <div className="relative flex-1 overflow-hidden">
          <h1>EditorPanel</h1>
        </div>
      </div>
    </DashboardContent>
  );
}
