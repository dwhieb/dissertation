# Dissertation

This repository contains the data and source code for my Ph.D. dissertation in linguistics at the University of California, Santa Barbara.

A self-imposed requirement for this project is that of empirical accountability and replicability. **This readme documents the steps to reproduce the results of this study,** whether using the same data employed in my dissertation, or a new data set entirely.

## Contents

<!-- TOC -->

- [1. Introduction](#1-introduction)
- [2. Technical Prerequisites](#2-technical-prerequisites)
  - [Cloning this Repository](#cloning-this-repository)
  - [Running Scripts](#running-scripts)
  - [Installing the Project](#installing-the-project)
- [3. Data Collection](#3-data-collection)
- [4. Data Preparation](#4-data-preparation)
  - [English](#english)
    - [Tokenizing the OANC](#tokenizing-the-oanc)
    - [Converting the OANC to JSON](#converting-the-oanc-to-json)
- [5. Data Annotation](#5-data-annotation)
  - [Selecting Words for Annotation](#selecting-words-for-annotation)
  - [The Annotations File](#the-annotations-file)
  - [The Annotation Process](#the-annotation-process)
- [7. Data Analysis](#7-data-analysis)
- [8. References](#8-references)
- [9. Legal](#9-legal)
  - [Todo](#todo)

<!-- /TOC -->

([back to top](#readme))

## 1. Introduction

The process of obtaining the results from this study, as in all empirical scientific studies, can be divided into several stages:

1. research questions
1. data selection
1. [data collection](#3-data-collection)
1. [data preparation](#4-data-preparation)
1. [data annotation](#5-data-annotation)
1. [data analysis](#6-data-analysis)
1. reporting results

There are not always clear boundaries between each stage (for example, a data selection step occurs at several places), but the above steps nonetheless provide a useful overview of the process.

This readme documents the _technical_ steps relating to [data collection](#3-data-collection), [data preparation](#4-data-preparation), [data annotation](#5-data-annotation) and [data analysis](#6-data-analysis). Discussion of the research questions, the decisions made during data annotation, and the results obtained may be found in my dissertation document, downloadable [here][dissertation].

([back to top](#readme))

## 2. Technical Prerequisites

### Cloning this Repository

This project and all its accompanying data and code are stored in a repository on [GitHub][GitHub]. In order to run the scripts in this project yourself, or use them with new data, you will need to clone this repository (copy it to your local computer), by following the instructions [here][cloning]. When this is done, all the necessary scripts will be on your computer, available for you to run.

### Running Scripts

While the inferential statistics and data visualization for this thesis were produced using the [R programming language][R], R is not well suited to large-scale data manipulation or processing of large files (Adler [2010](#Adler2010): 157–158). Therefore it is generally recommended that data preprocessing be conducted using other programming languages. In linguistics, this is typically done with Python. However, since I am proficient in JavaScript and not Python, the scripts for this project are written in JavaScript (specifically Node.js, which runs JavaScript on a local computer). JavaScript (via Node.js) is however gaining traction in data science,[^node-data-science] a trend which is expected to continue.

Node also comes with the Node Package Manager (<abbr title='Node package manager'>npm</abbr>), which allows you to install packages that other programmers have written in Node. Any public package in the npm registry may be installed by running `npm install {package-name}` from the command line.

For more information about Node.js and npm, visit the [Node.js][Node] and [npm][npm] websites.

You will need to download Node and npm in order to run many scripts in this project. You can download both pieces of software from the [Node.js web page][Node]. The scripts in this repository were written using Version 12 of Node, so you may need to download that specific version in order for the scripts in this project to work correctly.

Once Node is installed on your computer, any Node script can be run from the command line with the command `node {filename}`.

NPM also allows you to save commonly-used command line commands as project-specific scripts, saving you from having to retype the command and all its arguments each time you want to run it. You can run any of the npm scripts in this repository from the command line following the format `npm run {script-name}`.

### Installing the Project

Once you have cloned this repository and installed npm and Node, install the necessary packages for this project by navigating to the root folder of the repository in the command line and running `npm install`.

([back to top](#readme))

## 3. Data Collection

As mentioned above, all the data in this study are publicly available. This section presents the necessary steps for obtaining that data. Note that this repository does not contain the primary data itself, just annotations, statistics, and other derived versions of that data. The primary data lives in various places online, described below.

The data used for the investigation of English come from the [Open American National Corpus][OANC] (<abbr title='Open American National Corpus'>OANC</abbr>), a 15 million word corpus whose data are entirely open access. Since the data from other languages in this study are all from spoken texts, I elected to use just the spoken portion of the OANC, totaling 3,217,772 tokens. This spoken portion of the OANC is actually composed of two distinct subcorpora—the [Charlotte Narrative & Conversation Collection][Charlotte] (<abbr title='Charlotte Narrative &amp; Conversation Collection'>CNCC</abbr> or simply "the Charlotte corpus") and the [Switchboard Corpus][Switchboard]. More details about the Charlotte corpus may be found [here][Charlotte], and the Switchboard corpus [here][Switchboard].

The OANC may be downloaded in its entirety from from the [OANC download page][OANC-download] in `.zip` (625MB) or `.tgz` formats. You will need to unzip the folder after you have downloaded it. The spoken portion of the corpus is in `data/spoken` inside the downloaded folder.

([back to top](#readme))

## 4. Data Preparation

This section covers the steps necessary to convert and otherwise prepare the data used in this study for annotation and analysis.

When scripting with JavaScript, I find it significantly easier to work with data in <abbr title='JavaScript Object Notation'>JSON</abbr> (JavaScript Object Notation) format rather than raw text files. JSON is a simple text format that is highly human-readable, and can be natively parsed by every major programming language. As such it has become the standard data interchange format for the modern web. More information about JSON format can be found [here][JSON]. More details about the use of JSON format for linguistic data can be found [here][Daffodil].

### English

This section covers the steps for converting the OANC data to JSON format.

#### Tokenizing the OANC

For the OANC, converting the data to JSON involves first tokenizing the corpus. The OANC project provides an [ANC Tool][ANC-Tool] for this purpose, which offers various ways of converting and tagging OANC data. More information about the ANC Tool may be found [here][ANC-Tool]. Steps for tokenizing the OANC using the ANC Tool are as follows:

1. Download the ANC Tool from the [ANC Tool download page][ANC-Tool] and unzip the folder. If you have already cloned this repository, you may skip this step; the ANC Tool is located in the `scripts/ANC` folder.

1. If you do not have Java installed on your computer, download it from [here][Java] and then install it on your computer.

1. Run the ANC Tool following the instructions on the [ANC Tool page][ANC-Tool]. It is recommended that you run the tool from the command line following the format `java -Xmx500M -jar ANCTool-x.y.z-jar.jar`. See the [ANC Tool page][ANC-Tool] for complete details. If you have npm installed on your computer, you can simply run the ANC Tool from the command line with `npm run anc`.

1. The first time you run the ANC Tool, it will ask you to specify the location of the folder where the files `annotations.xml` and `OANC-corpus-header.xml` are located. Select this folder and click _Accept_.

1. A screen with various settings will appear. Select the following:

    - **Input Directory:** Select the folder containing the data you wish to tokenize.
    - **Output Directory:** Select the location where you would like the new version of the corpus to be generated. Make sure this folder is **different** from the input directory.
    - **Input Format:** Select _GrAF_.
    - **Encoding (Text):** Select _UTF-8_.
    - **Copy Directory Structure:** Check this box. (However, leaving it uncheck should not affect the scripts in this project.)
    - **MonoConc Pro**: Select this tab.
    - **Part of Speech:** Select _Hepple part of speech tags_
    - **Separator Character:** Leave this set to the underscore (`_`)

1. Click the _Process_ button. This will begin converting the corpus, which will take several minutes. This converts each text in the OANC to a new file that is tokenized and tagged for part of speech.

#### Converting the OANC to JSON

To convert the OANC to JSON, I used a JavaScript library called [`tags2dlx`][tags2dlx], which I wrote and published for this purpose. It takes a directory of texts tagged for part of speech (where each word token is followed by an underscore and then its part-of-speech tag) and converts it to a JSON file. More information about the `tags2dlx` library may be found [here][tags2dlx].

To convert the OANC, follow the instructions for using the `tags2dlx` library, which can be found [here][tags2dlx]. In this repository, the converted files are located in `data/English/data`, and end in a `.json` extension.

<!-- For ease of analysis, I chose to format all the corpora used in this study as [Scription][Scription] files, a simple, very readable text format, which places one interlinear glossed utterance on each line. (For the English data, this simply amounts to placing one utterance / sentence on each line, with no accompanying translation or glosses.) Read more about the Scription format [here][Scription]. -->

### Nuuchahnulth

<!-- Explain how you typed the data first in a practical orthography, and then transliterated it to the actual orthography used in the texts. -->

<!-- Make files available for both orthographies. -->

([back to top](#readme))

## 5. Data Annotation

This section covers the technical steps involved in the process of annotating the data for this study.

### Selecting Words for Annotation

100 archilexemes were selected from each corpus for annotation. These archilexemes were chosen randomly from the set of wordforms in each corpus, by first dividing those wordforms into 100 different bins depending on the corpus dispersion of that wordform (measured using <dfn>Deviation of Proportions</dfn> (<abbr title='Deviation of Proportions'>DP</abbr>) [Gries [2008](#Gries2008)]), and then selecting one word randomly from each bin. Words which did not meet the selection criteria were thrown out, and the process was repeated until 100 viable archilexemes were found. The selection criteria for archilexemes are discussed in the Data & Methods chapter of my dissertation document, available [here][dissertation].

To select the 100 archilexemes, I first wrote a script which produces a tab-delimited file listing each wordform in the corpus, its raw frequency, and its corpus dispersion. In addition, the script prints the total size of the corpus to the console. This script is located in the file `scripts/bin/generateWordforms.js`, and can be run on the command line using the following command, where `{input}` is the path to the directory where the JSON corpus is located, and `{output}` is the location where you would like the resulting TSV file generated.

```cmd
node --experimental-modules --no-warnings scripts/bin/generateWordforms.js {input} {output}
```

However, this script by itself does not filter the data in any way. The list of wordforms it generates includes many that are unnecessary for this study. To make the task of selecting words for annotation easier, I therefore created one script for each corpus in this study, which filters out unwanted tokens from the resulting list of wordforms (without affecting the calculation of dispersion). The scripts for each language can be run as follows:

```cmd
node --experimental-modules --no-warnings data/English/bin/generateEnglishWordforms.js {input} {output}
node --experimental-modules --no-warnings data/Nuuchahnulth/bin/generateNuuchWordforms.js {input} {output}
```

The script for English relies on two files: `blacklist.yml` and `nonLexicalTags.yml`, both located in the `data/English/constants` folder. The `blacklist.yml` file contains a list of wordforms that should not be included in the list of wordforms (but again, without affecting calculation of dispersion, or the overall reported corpus frequency). Similarly, the `nonLexicalTags.yml` file contains Penn tags which should be excluded from the resulting wordlist. You can update either of these files to change the words which are filtered out of the English data.

---

Having generated the list of wordforms and their statistics, I then wrote an R script which bins wordforms based on their corpus dispersions, and generates a list of 100 suggested wordforms (one from each dispersion bin) and saves it to a text file. This script is located in `scripts/stats/selectWordforms.R`. You can adjust the `input_path` and `output_path` variables at the top of the file to point it to the lists of wordforms generated above, and the location where you would like the list of selected wordforms to be generated, respectively.

Finally, I used this list of suggested wordforms to pick which archilexemes I wanted to annotate. If a suggested wordform didn't meet the selection criteria, I added it to `blacklist.yml` and regenerated the list of wordforms. Occasionally, in the higher frequencies, there were no wordforms in that dispersion bin. When this happened, I selected a word from the next lowest dispersion bin, with the result that a few bins are represented more than once in the annotated data.

The final list of 100 archilexemes was created manually, and is located in `data/English/stats/selectedArchilexemes.txt`.

After this was done, I next created a list of every possible inflected wordform of the 100 archilexemes that were selected for annotation. Morphologically derived forms were not included, but suppletive inflections variants were included. Thus for the archilexeme _know_, I included the following wordforms:

- _knew_
- _know_
- _knowing_
- _known_
- _knows_

Some of these wordforms also function as morphologically derived words. This is a function of the fact that certain morphemes in English, like _‑ing_, have both inflectional and derivational uses. To be thorough I had to begin by including both inflectional and derivational uses in the list of tokens to annotate. However, when a derivational use of one of these words was encountered, I manually removed it from the data, since this study is focused on only morphologically unmarked derivation, i.e. conversion.

I also had to include some seemingly unusual wordforms in this list. For example, the forms of the archilexeme _one_ are as follows:

- _one_
- _ones_
- _oned_
- _oning_
- _onning_

Including the strange-looking verbal forms of _one_ allow the script to find any potential predicative uses of the word _one_ in addition to modificational or referential uses. While there are no such predicative uses of _one_ in the OANC, examples can easily be found online, such as the following:

> What might be if we were **Oned**? United, as we would say (David Grieve, _Love in thin places_)

Therefore it was necessary to construct the list of wordforms to annotate as inclusively as possible, in order to be open to the possibility of finding even seemingly unlikely or impossible cases of conversion.

For English, I did not have to included possessive forms in the list of wordforms because `'s` is tokenized as a separate word by the OANC.

The resulting list of English wordforms to annotate is located in `data/English/stats/selectedWordforms.json`.

### The Annotations File

The annotations on the data used in this study are <dfn>stand-off</dfn> or <dfn>standalone</dfn> annotations—that is, annotations which live in a separate file, and contain information about the original utterances they apply to. For this project, I stored the annotations in basic tab-separated files (`.tsv`), making it easy to add and edit annotations using spreadsheet software such as [Microsoft Excel][Excel] or [Apache OpenOffice Calc][OpenOffice], among others. All annotations were placed in a single large spreadsheet, with the language of each annotation / observation indicated.

The columns included in the annotation spreadsheet are below. The annotations spreadsheet followed a Keyword-in-Context (KWIC) format, allowing me to see the immediately preceding and following context for each token.

Column Name   | Description
------------- | -----------
language      | The ISO 639-3 code for the language of this observation.
text          | The name of the text that the token appears in.
utterance     | The number of the utterance within the text that the token appears in. (Numbering starts at 1.)
word          | The number of the word within the utterance that the token appears in. (Numbering starts at 1.)
archilexeme   | The archilexeme that this word token and lexeme belongs to.
function      | The discourse function of this word token. This must have a value of `R` (reference), `P`, (predication), or `M` (modification).
pre           | The words in the utterance preceding the token.
token         | A transcription of the word token being annotated. This may also be called the <dfn>wordform</dfn>. It does not include any prosodic markup or punctuation.
post          | The words in the utterance following the token.
translation   | A translation of the utterance that the word token appears in. This was not included for English data.

<!-- lexeme        | The headword representing the lexeme that this word token belongs to. For homonymous lexemes, a trailing number is sometimes added (for example, `house1`, `house2`). -->

Rather than copy-paste each token and its surrounding context into this spreadsheet, I utilized the [DLx concordance library][dlx-concordance], a tool I wrote and published which takes a list of wordforms, finds every instance of those wordforms in a corpus, and generates a tab-delimited list of tokens in Keyword-in-Context format. You can run this script on the command line as follows:

```cmd
node node_modules/@digitallinguistics/concordance/concordance.js --dir={directory} --KWIC --outputPath={output path} --wordlist={wordlist}
```

In this command, `{directory}` is the path to the directory where the corpus is located, `--KWIC` indicates that the concordance should be generated in Keyword-in-Context format, `{output path}` is the path where you would like the concordance file generated, and `{wordlist}` is the path to the JSON file containing an array of wordforms to concordance (the `selectedWordforms.json` file generated in the previous section).

In this repository, the resulting concordance files are stored in `data/English/tokens.tsv` and `data/Nuuchahnulth/tokens.tsv` respectively.

You can generate a concordance using a different corpus, list of words, or other options by following the usage instructions for the [DLx concordance library][dlx-concordance].

### The Annotation Process

Some of the archilexemes I investigated encompass more than one historically unrelated sense. For example, the two primary senses of the English word _like_—'be pleasing' and 'be similar'—are historically unrelated. In these cases, I chose one of the historical forms and annotated only uses relating to that form, removing tokens of any other words from the data. I tried to choose the more frequent use in each case.

([back to top](#readme))

## 7. Data Analysis

([back to top](#readme))

## 8. References

* <p id=Adler2010>Adler, Joseph. 2010. <cite>R in a nutshell: A quick desktop reference</cite>. O'Reilly.</p>

* <p id=Gries2008>Gries, Stefan Th. 2008. Dispersions and adjusted frequencies in corpora. <cite>International Journal of Corpus Linguistics</cite> 13(4): 403–437. DOI:<a href=https://doi.org/10.1075/ijcl.13.4.02gri>10.1075/ijcl.13.4.02gri</a>.</p>

([back to top](#readme))

## 9. Legal

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

<!-- Footnotes -->
[^node-data-science]: https://opensource.com/article/20/6/data-science-nodejs

<!-- Links -->
[ANC-Tool]:         http://www.anc.org/software/anc-tool/
[Charlotte]:        https://newsouthvoices.uncc.edu
[cloning]:          https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository
[Daffodil]:         https://format.digitallinguistics.io/
[dissertation]:     https://files.danielhieber.com/publications/dissertation.pdf
[dlx-concordance]:  https://github.com/digitallinguistics/concordance/
[Excel]:            https://products.office.com/en-us/excel
[GitHub]:           https://github.com/dwhieb/dissertation
[Java]:             https://www.java.com
[JSON]:             http://json.org/
[Node]:             https://nodejs.org/
[npm]:              https://www.npmjs.com/
[OANC]:             http://www.anc.org/
[OANC-download]:    http://www.anc.org/data/oanc/download/
[OpenOffice]:       http://www.openoffice.org/product/calc.html
[R]:                https://www.r-project.org/
[Scription]:        https://scription.digitallinguistics.io/
[Switchboard]:      https://catalog.ldc.upenn.edu/LDC97S62
[tags2dlx]:         https://github.com/digitallinguistics/tags2dlx
