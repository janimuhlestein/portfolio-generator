const inquirer = require('inquirer');

//const fs = require('fs');
const {writeFile, copyFile} = require('./utils/generate-site.js');
const generatePage = require('./src/page-template');

/*const profileDataArgs = process.argv.slice(2, process.argv.length);
//const name = profileDataArgs[0];
//const github = profileDataArgs[1];
const [name, github] = profileDataArgs;

const printProfileData = profileDataArr => {
    console.log('========================');
    profileDataArr.forEach(profileItem => console.log(profileItem));
};

//printProfileData(profileDataArgs);

fs.writeFile('index.html', generatePage(name,github), err => {
    if(err) throw err;
    console.log('Portfolio complete!')
});



*/
const promptUser = () => {
    return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?(Required)',
                validate: nameInput => {
                    if(nameInput) {
                        return true;
                    } else {
                        console.log('Please enter your name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'Enter your GitHub Username'
            },
            {
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to enter some information about yourself for an About section?',
                default: true
            },
            {
                type: 'input',
                name: 'about',
                message: 'Please provide some information about yourself:',
                when: ({confirmAbout}) => confirmAbout
            }
        ]);
    };
    
    const promptProject = portfolioData => {
    
        if (!portfolioData.projects) {
            portfolioData.projects = [];
          }
       
    
        console.log(`
        =================
        Add a new project
        =================
        `);
    
       
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project?'
            },
            {
                type: 'input',
                name: "description",
                message: 'Provide a description of the project (Required)',
                validate: descriptionInput => {
                    if(descriptionInput) {
                        return true;
                    } else {
                        console.log('Please enter a project description!');
                        return false;
                    }
                }
            },
            {
                type: 'checkbox',
                name: 'languages',
                message: 'What did you use for this project? (Check all that apply)',
                choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
            },
            {
                type: 'input',
                name: 'link',
                message: 'Enter the Github link to your project (Required)'
            },
            {
                type: 'confirm',
                name: 'feature',
                message: 'Would you like to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to enter another project?',
                default: false
            }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if(projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
    };
    
   /* promptUser()
    .then(promptProject)
    .then(portfolioData=> {
       // console.log(portfolioData);
       const pageHTML = generatePage(portfolioData);
       fs.writeFile('./dist/index.html', pageHTML, err => {
           if(err) throw new Error(err);
           console.log('Page created! Check out the index.html!');
           fs.copyFile('./src/style.css', './dist/style.css', err =>{
               if(err) {
                   console.log(err);
                   return;
               }
               console.log('Style sheetcopied successfully!');
           });
       });
    });
    */

    promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });