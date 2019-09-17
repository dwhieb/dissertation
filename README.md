# Dissertation

This repository contains the data and source code for my Ph.D. dissertation in linguistics at the University of California, Santa Barbara.

A self-imposed requirement for this project is that of empirical accountability and replicability. **This readme documents the steps to reproduce the results of this study,** whether using the same data employed in my dissertation, or a new data set entirely.

## Contents

1. [Introduction](#Introduction)
1. [Technical Prerequisites](#technical-prerequisites)
1. [Data Collection](#data-collection)
1. [Data Preparation](#data-preparation)
1. [Data Annotation](#data-annotation)
1. [Data Analysis](#data-analysis)
1. [References](#references)
1. [Legal](#legal)

## 1. Introduction ([back to top](#readme))

The process of obtaining the results from this study, as in all empirical scientific studies, can be divided into several stages:

1. research questions
1. data selection
1. [data collection](#data-collection)
1. [data preparation](#data-preparation)
1. data annotation
1. [data analysis](#data-analysis)
1. reporting results

There are not always clear boundaries between each stage (for example, a data selection step occurs at several places), but the above steps nonetheless provide a useful overview of the process.

This readme documents the _technical_ steps relating to [data collection](#data-collection), [data preparation](#data-preparation), [data annotation](#data-annotation) and [data analysis](#data-analysis). Discussion of the research questions, the decisions made during data annotation, and the results obtained may be found in my dissertation document, downloadable [here][dissertation].

## 2. Technical Prerequisites ([back to top](#readme))

### Cloning this Repository

This project and all its accompanying data and code are stored in a repository on [GitHub][GitHub]. In order to run the scripts in this project yourself, or use them with new data, you will need to clone this repository (copy it to your local computer), by following the instructions [here][cloning]. When this is done, all the necessary scripts will be on your computer, available for you to run.

### Running Scripts

While the inferential statistics and data visualization for this thesis were produced using the R programming language, R is not well suited to large-scale data manipulation or processing of large files (Adler [2010](#Adler2010): 157&ndash;158). Therefore it is generally recommended that data preprocessing be conducted using other programming languages. In linguistics, this is typically done with Python. However, since the programming language I am most comfortable with is JavaScript, the scripts for this project are written in Node.js, software that allows JavaScript to be run on a local computer.

Node also comes with the Node Package Manager (<abbr title='Node package manager'>npm</abbr>), which allows you to install packages that other programmers have written in Node. Any public package in the npm registry may be installed by running `npm install {package-name}` from the command line.

For more information about Node.js and npm, visit the [Node.js][Node] and [npm][npm] websites.

You will need to download Node and npm in order to run many scripts in this project. You can download both pieces of software from the [Node.js web page][Node]. The scripts in this repository were written using Version 12 of Node, so you may need to download that specific version in order for the scripts in this project to work correctly.

Once Node is installed on your computer, any Node script can be run from the command line with the command `node {filename}`.

NPM also allows you to run save commonly-used command line commands as project-specific scripts, saving you from having to retype the command and all its arguments each time you want to run it. You can run any of the npm scripts in this repository from the command line following the format `npm run {script-name}`.

### Installing the Project

Once you have cloned this repository and installed npm and Node, install the necessary packages for this project by navigating to the root folder of the repository in the command line and running `npm install`.

## 3. Data Collection ([back to top](#readme))

As mentioned above, all the data in this study are publicly available. This section presents the necessary steps for obtaining that data. Note that this repository does not contain the primary data itself, just annotations, statistics, and other accompanying data that is produced from the original data. The primary data itself lives in various places online, described below.

The data used for the investigation of English in this study come from the [Santa Barbara Corpus of Spoken American English][SBC] (<abbr title='Santa Barbara Corpus of Spoken American English'>SBC</abbr>), a 249,000-word corpus whose data are entirely open access. More information about the SBC may be found at the [SBC web page][SBC].

## 4. Data Preparation ([back to top](#readme))

<!--
### Converting the Corpus to JSON

When scripting with JavaScript, I find it significantly easier to work with data in <abbr title='JavaScript Object Notation'>JSON</abbr> (JavaScript Object Notation) format rather than raw text files. JSON is a simple text format that is highly human-readable, and can be natively parsed by every major programming language. As such it has become the standard data interchange format for the modern web. More information about the JSON format can be found [here][JSON]. More details about the use of JSON format for linguistic data can be found [here][Daffodil].
-->

## 5. Data Analysis ([back to top](#readme))

<!--

Once the data are prepared and stored as JSON files, they are ready for statistical analysis. For this project, I generated statistical data on three types of linguistic objects—wordforms, lexemes, and archlexemes. For each linguistic type, I wrote a script in the `scripts/stats` folder which generates a list of items of that type, and the relevant statistics about each item:

- `generateWordforms.js`: Generates a tab-delimited file containing each unique wordform in the corpus and its raw frequency

- `generateLexemes.js`: Generates a tab-delimited file containing each lexeme in the corpus and its raw frequency

- `generateArchlexemes.js`: Generates a tab-delimited file containing each archlexeme in the corpus and its raw frequency

Each of these scripts can be run with the following command:

```cmd
node --experimental-modules --no-warnings scripts/bin/{script}.js {data directory} {output path}
```

`{script}` is the name of the script to run (`generateWordforms`, `generateLexemes`, or `generateArchlexemes`), `{data directory}` is the path to your directory of JSON data files, and `{output path}` is the path where you would like the resulting file generated. For example:

```cmd
node --experimental-modules --no-warnings scripts/bin/generateArchlexemes.js data/English/data data/English/stats/archlexemes.tsv
```

All three of these statistical files can also be generated with a single command:

```cmd
npm run stats
```

The resulting files will look something like this:

Wordform | Frequency
-------- | ---------
the_DT   | 26116
to_TO    | 13480
and_CC   | 12527
of_IN    | 12000
a_DT     | 9748

-->

## 6. References ([back to top](#readme))

* <p id=Adler2010>Adler, Joseph. 2010. <cite>R in a nutshell: A quick desktop reference</cite>. O'Reilly</p>

## 7. Legal ([back to top](#readme))

Currently, none of the materials in this repository are licensed for copying, reproduction, redistribution, modification, or reuse. Please contact [Daniel W. Hieber](https://danielhieber.com) if you wish to use any of the materials in this repository.

### Todo

(see issue #[549](https://github.com/dwhieb/dissertation/issues/549))

Add copyright and license for each section of this repository

- [ ] document (copyright to me, licensed under CC BY 4.0)
- [ ] corpora
  - [ ] OANC (copyright, license)
- [ ] comics (individual copyrights)
- [ ] scripts
  - [ ] ANC tool
  - [ ] my scripts (MIT license)

<!-- Links -->
[cloning]:      https://help.github.com/en/articles/cloning-a-repository
[Daffodil]:     https://format.digitallinguistics.io/
[dissertation]: https://files.danielhieber.com/publications/dissertation.pdf
[GitHub]:       https://github.com/dwhieb/dissertation
[JSON]:         http://json.org/
[Node]:         https://nodejs.org/
[npm]:          https://www.npmjs.com/
[SBC]:          https://www.linguistics.ucsb.edu/research/santa-barbara-corpus
