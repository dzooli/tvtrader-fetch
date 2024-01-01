// Copyright (c) 2024 Zoltan Fabian
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

export default () => {
  const res = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
  return res;
};
