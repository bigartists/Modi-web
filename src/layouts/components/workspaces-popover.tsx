'use client';

import type { ButtonBaseProps } from '@mui/material/ButtonBase';

import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';

import { useCombinedStore } from 'src/store';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export type WorkspacesPopoverProps = ButtonBaseProps & {
  data?: {
    id: string;
    name: string;
    logo: string;
    plan: string;
  }[];
};

export function WorkspacesPopover({ data = [], sx, ...other }: WorkspacesPopoverProps) {
  const popover = usePopover();

  const mediaQuery = 'sm';

  const [workspace, setWorkspace] = useState<any>({
    plan: 'namespace',
  });
  const { namespace, updateNamespace } = useCombinedStore();

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      // setWorkspace(data[0]);
      // updateNamespace(data[0]?.name);
    }
  }, [data, updateNamespace]);

  const handleChangeWorkspace = useCallback(
    (newValue: (typeof data)[0]) => {
      setWorkspace(newValue);
      updateNamespace(newValue.name);
      popover.onClose();
    },
    [popover, updateNamespace]
  );

  return (
    <>
      <ButtonBase
        disableRipple
        onClick={popover.onOpen}
        sx={{
          py: 0.5,
          gap: { xs: 0.5, [mediaQuery]: 1 },
          ...sx,
        }}
        {...other}
      >
        {/* <Box
          component="img"
          alt={workspace?.name}
          src={workspace?.logo}
          sx={{ width: 24, height: 24, borderRadius: '50%' }}
        /> */}

        <Label
          color={workspace?.plan === 'Free' ? 'default' : 'info'}
          sx={{
            height: 22,
            display: { xs: 'none', [mediaQuery]: 'inline-flex' },
          }}
        >
          {workspace?.plan}
        </Label>

        <Box
          component="span"
          sx={{
            typography: 'subtitle2',
            display: { xs: 'none', [mediaQuery]: 'inline-flex' },
          }}
        >
          {workspace?.name ? (
            workspace?.name
          ) : (
            <Box
              component="span"
              sx={{
                typography: 'subtitle2',
                color: 'text.disabled',
                textTransform: 'capitalize',
              }}
            >
              Select Namespace
            </Box>
          )}
        </Box>

        {/* add closed icon */}
        {workspace?.name && (
          <Iconify
            width={16}
            icon="carbon:close"
            sx={{ color: 'text.disabled' }}
            onClick={(e) => {
              e.stopPropagation();
              setWorkspace({ plan: 'namespace' });
              updateNamespace('');
            }}
          />
        )}

        <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: 'text.disabled' }} />
      </ButtonBase>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'top-left' } }}
      >
        <MenuList sx={{ width: 300, overflowY: 'auto', height: 600 }}>
          {data.map((option) => (
            <MenuItem
              key={option.id}
              selected={option.id === workspace?.id}
              onClick={() => handleChangeWorkspace(option)}
              sx={{ height: 48 }}
            >
              {/* <Avatar alt={option.name} src={option.logo} sx={{ width: 24, height: 24 }} /> */}
              <Label color={option.plan === 'Free' ? 'default' : 'info'}>{option.plan}</Label>
              <Box component="span" sx={{ flexGrow: 1 }}>
                {option.name}
              </Box>
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}
