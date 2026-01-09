#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import axios from 'axios';
import fs from 'fs/promises';
import chalk from 'chalk';
import clipboardy from 'clipboardy';

const program = new Command()

program
    .command('add')
    .description('Save a code snippet to the cloud!!!')
    .action(async () => {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the Title of the snippet:'
            },
            {
                type: 'editor',
                name: 'code',
                message: "Paste your Code:"
            }
        ])

        console.log("User Input:",answer);
        // here logic will be written ig 
        console.log("Just ran add command");

        try {
            const payload = {
                title: answer.title,
                code: answer.code
            }

            const res = await axios.post('http://127.0.0.1:3000/add', payload)

            console.log("Server replied", res.data);
        } catch (error) {
            console.log(error);
            console.log("Cde fattt gyaaa....", error.message);
        }

    })

program
    .command('download')
    .description('Download all snippets from server to a local backup file')
    .action(async () => {

        console.log(chalk.yellow('\n📥 Fetching snippets from CloudVault...'));

        try {
            // get request maro and get the data from the server 
            const response = await axios.get('http://127.0.0.1:3000/read')

            // get the data out of the response
            const allSnippets = response.data   //its json object basically

            // parse this data arr into string
            const allSnippetsString = JSON.stringify(allSnippets, null, 2)

            // now write this data into a file fgs
            await fs.writeFile('backup.json', allSnippetsString)

            console.log("Successfully got the data!!");

        } catch (error) {
            console.error("error: ", error)
        }
    })

program
    .command('get <search_term>')
    .description('Get a snippet by title and copy to clipboard')
    .action(async (search_term) => {
        console.log(`\n🔍 Searching for "${search_term}...`);
        try {
            // /read endpoint for GET reqest maro
            const response = await axios.get("http://127.0.0.1:3000/read")

            // get the data arra from this response 
            const allSnippetsArr = response.data

            const snippetValue = allSnippetsArr.find((snippet) => snippet.title.toLowerCase().includes(search_term.toLowerCase()))

            if(!snippetValue ) {
                console.log(chalk.red('\n❌ Sorryy!!! Snippet not found! Check spelling.'));
                return
            }

            // copy this snippetValue to clipboard 
            clipboardy.writeSync(snippetValue.code)

            console.log(chalk.green('\n✅ Found & Copied to Clipboard!'));
            console.log(chalk.gray('-----------------------------------'));
            console.log(chalk.white(snippetValue.code)); // Show preview
            console.log(chalk.gray('-----------------------------------'));
            console.log(chalk.cyan('Just press Ctrl+V to paste it anywhere!!!'));

        } catch (error) {
            console.error(chalk.red('Error fetching data:', error.message));
        }
    })

program.parse(process.argv)

