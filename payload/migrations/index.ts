import * as migration_20260713_192303_init_vercel_neon from './20260713_192303_init_vercel_neon';
import * as migration_20260714_143800_fix_project_status_enum from './20260714_143800_fix_project_status_enum';

export const migrations = [
  {
    up: migration_20260713_192303_init_vercel_neon.up,
    down: migration_20260713_192303_init_vercel_neon.down,
    name: '20260713_192303_init_vercel_neon'
  },
  {
    up: migration_20260714_143800_fix_project_status_enum.up,
    down: migration_20260714_143800_fix_project_status_enum.down,
    name: '20260714_143800_fix_project_status_enum'
  },
];
