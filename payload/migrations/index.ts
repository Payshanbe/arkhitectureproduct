import * as migration_20260713_192303_init_vercel_neon from "./20260713_192303_init_vercel_neon";
import * as migration_20260714_143800_fix_project_status_enum from "./20260714_143800_fix_project_status_enum";
import * as migration_20260722_180942_add_localization from "./20260722_180942_add_localization";
import * as migration_20260722_225700_add_partners from "./20260722_225700_add_partners";

export const migrations = [
  {
    up: migration_20260713_192303_init_vercel_neon.up,
    down: migration_20260713_192303_init_vercel_neon.down,
    name: "20260713_192303_init_vercel_neon",
  },
  {
    up: migration_20260714_143800_fix_project_status_enum.up,
    down: migration_20260714_143800_fix_project_status_enum.down,
    name: "20260714_143800_fix_project_status_enum",
  },
  {
    up: migration_20260722_180942_add_localization.up,
    down: migration_20260722_180942_add_localization.down,
    name: "20260722_180942_add_localization",
  },
  {
    up: migration_20260722_225700_add_partners.up,
    down: migration_20260722_225700_add_partners.down,
    name: "20260722_225700_add_partners",
  },
];
