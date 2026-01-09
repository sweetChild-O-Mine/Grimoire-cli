# Grimoire CLI

A command-line tool to store and retrieve code snippets from the cloud.

## Installation

```bash
npm install -g grimoire-cli
```

On Linux/macOS, you may need to use `sudo`:

```bash
sudo npm install -g grimoire-cli
```

Or use it directly without installing:

```bash
npx grimoire-cli
```

## Usage

After installation, use the `grim` command:

```bash
grim <command>
```

## Commands

### Add a snippet

Save a new code snippet to the cloud:

```bash
grim add
```

You will be prompted to enter a title and paste your code.


### Get a snippet

Search for a snippet by title and copy it to your clipboard:

```bash
grim get <search_term>
```

Example:

```bash
grim get express-boiler
```

### Download all snippets

Download all your snippets to a local `backup.json` file:

```bash
grim download
```

## Examples

```bash
# Save a code snippet to the cloud!!!
grim add

# Get a snippet by title and copy to clipboard
grim get <search_term>

# Backup all snippets locally
grim download

# display help for command
help [command]


```

## Requirements

- Node.js 18 or higher

## License

ISC