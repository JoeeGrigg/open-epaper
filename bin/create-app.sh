#!/bin/bash

# Check if name argument is provided
if [ -z "$1" ]; then
    echo "Error: Please provide a name for the app"
    echo "Usage: $0 <app-name>"
    exit 1
fi

# Convert name to hyphenated format
# Replace spaces and underscores with hyphens, convert to lowercase
APP_NAME=$(echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr '_' '-')

# Define paths
TEMPLATE_DIR="apps/template"
NEW_APP_DIR="apps/$APP_NAME"

# Check if template directory exists
if [ ! -d "$TEMPLATE_DIR" ]; then
    echo "Error: Template directory $TEMPLATE_DIR does not exist"
    exit 1
fi

# Create new app directory and copy template
echo "Creating new app: $APP_NAME"
mkdir -p "$NEW_APP_DIR"
cp -r "$TEMPLATE_DIR"/* "$NEW_APP_DIR/"

# Change directory to the new app
cd "$NEW_APP_DIR"

# Update template fields
echo "Updating template fields"
jq ".name = \"$APP_NAME\"" package.json > temp.json && mv temp.json package.json
jq ".expo.name = \"$APP_NAME\" | .expo.slug = \"$APP_NAME\" | .expo.scheme = \"open-epaper-$APP_NAME\"" app.json > temp.json && mv temp.json app.json

# Install dependencies
echo "Installing dependencies"
yarn install

echo "----------------------------------------"
echo "App created successfully at: $NEW_APP_DIR"
echo "Next Steps:"
echo "  1. Run 'cd $NEW_APP_DIR' to change to the new project directory"
echo "  2. Run 'yarn android' to run the app on an Android device or emulator"
echo "----------------------------------------"
