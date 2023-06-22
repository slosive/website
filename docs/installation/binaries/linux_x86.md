---
sidebar_position: 1
---

# Linux (x84_64)

Install **sloscribe** on linux (x84_64).

## Requirements

To install the tool using this method you'll require:

* cURL
* tar
* wget (optional)

Present on your host machine.

## Installation

Simply run, in your terminal:

```shell
curl -s -L https://github.com/slosive/sloscribe/releases/latest/download/sloscribe-linux-amd64.tar.gz | tar xzv
# might require sudo
mv sloscribe-linux-amd64/sloscribe /usr/local/bin
```

This will install the latest sloscribe binary under the path: `/usr/local/bin/sloscribe`.

> You can install different versions by setting the tag to the target version: https://github.com/slosive/sloscribe/releases/download/v0.1.0-alpha.1/sloscribe-linux-amd64.tar.gz

## Verify Installation

```shell
sloscribe --help
```

The binary should return something similar to:

```shell
Generate Sloth SLO/SLI definitions from code annotations.

Usage:
  sloscribe [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  init        Init generates the Sloth definition specification from source code comments.
  version     Returns the binary build information.

Flags:
  -h, --help               help for sloscribe
      --log-level string   Only log messages with the given severity or above. One of: [none, debug, info, warn], errors will always be printed (default "info")

Use "sloscribe [command] --help" for more information about a command.
```

## Uninstall 😢

To uninstall the tool you can simply delete the binary from the following directory.

```shell
# might require sudo
rm /usr/local/bin/sloscribe
```
