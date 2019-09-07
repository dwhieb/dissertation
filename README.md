# Dissertation

This repository contains the data and source code for my Ph.D. dissertation in linguistics at the University of California, Santa Barbara.

## Replicating the Results of this Study

A self-imposed requirement for this project is that of empirical accountability and replicability. This readme therefore documents the steps to follow in order to reproduce the results of this study, whether using the same data employed in my dissertation, or on a new data set entirely. A secondary consequence of this prerequisite is that all of the data used for this study are publicly available under an open license.

The process of obtaining the results from this study, as in all empirical scientific studies, can be divided into several stages:

1. theoretical prerequisites
2. data selection
3. [data collection](#stage-3-data-collection)
4. [data preparation](#stage-4-data-preparation)
5. [data coding](#stage-5-data-coding)
6. [quantitative analysis](#stage-6-quantitative-analysis)
7. qualitative analysis

There are not always clear boundaries between each stage (for example, a data selection step occurs at several places), but the above steps nonetheless provide a useful overview of the process.

This readme documents the technical steps relating to [data collection](#stage-3-data-collection), [data preparation](#stage-4-data-preparation), and [quantitative analysis](#stage-6-quantitative-analysis). Discussion of the theoretical prerequisites, data coding, and qualitative analysis of the data may be found in my dissertation document, downloadable [here][dissertation].

### Technical Prerequisites

#### Node.js

Since my preferred programming language is JavaScript, the scripts for this project are written in Node.js, software that allows JavaScript to be run on a local computer. Once Node is installed on your computer, any Node script can be run from the command line with the command `node script.js`.

Node also comes with the Node Package Manager (npm), which allows you to install packages that other programmers have written in Node. Any public package in the npm registry may be installed by running `npm install package-name` from the command line. npm also allows you to run scripts within a project from the command line. For example, this project has a script called `copy-pdf`, which copies the compiled LaTeX PDF from `src/main.pdf` to `dissertation.pdf`. These project-specific scripts can be run on the command line following the format `npm run copy-pdf`.

For more information about Node.js and npm, visit the [Node.js][Node] and [npm][npm] websites.

You will need to download Node and npm in order to run most of the scripts in this project. You can download both pieces of software from the [Node.js web page][Node]. The scripts in this repository were written using Version 12 of Node, so you may need to download that specific version in order for the scripts in this project to work correctly.

#### Cloning this Repository

In order to run the scripts in this project yourself, or use them with new data, you will need to follow these steps:

1. *Clone* this repository (copy it to your local machine). Instructions for cloning a repository may be found [here][cloning].

1. Install the necessary packages for this project by navigating to the root folder of this project in the command line and running `npm install`.

### Stage 3: Data Collection

As mentioned above, all the data in this study are publicly available. This section presents the necessary steps for obtaining that data. Note that this repository does not contain the primary data itself, just annotations, statistics, and other accompanying data that is produced from the original data. The primary data itself lives in various places online, described below.

The data used for the investigation of English in this study come from the [Open American National Corpus][OANC] (<abbr title='Open American National Corpus'>OANC</abbr>), a 15 million word corpus whose data are entirely open access. This corpus comes with part-of-speech tags from several different tag sets. The OANC includes a Manually Annotated Sub-Corpus (<abbr title='Manually Annotated Sub-Corpus'>MASC</abbr>) of approximately 500,000 words whose annotations have been manually produced, and which include tags for lemmas. For this project I have elected to use just the Manually Annotated Sub-Corpus (MASC) of the OANC, and chosen to use the Penn tag set for part-of-speech annotations and lemmatization. More information about the OANC may be found at the [OANC web page][OANC]. More information about the Penn tag set may be found in Marcus, Santorini, & Marcinkiewicz ([1993](#MarcusSantoriniMarcinkiewicz1993)).

The MASC data may be downloaded from the [MASC download page][MASC-download] in either `zip` or `tar` formats. You will need to unzip the folder after you have downloaded it.

### Stage 4: Data Preparation

Preparing the MASC data for additional annotation and statistical analysis involves the following steps:

1. [apply stand-off annotations](#applying-stand--off-annotations)
1. [convert corpus to JSON](#converting-the-corpus-to-json)

Details for accomplishing each of these tasks are given in the sections below.

#### Applying Stand-Off Annotations

Some types of annotations, such as part-of-speech and lemma information, have already been produced by the research team behind the OANC. These annotations are freely available for download along with the OANC data itself. All annotations for the OANC are *stand-off* annotations, where each annotation is stored in a separate file from the primary data. Therefore as a first step in data preparation, it is necessary to merge the part-of-speech and lemma information directly into the primary data for ease of scripting and additional data coding.

The OANC project provides an [ANC Tool][ANC-Tool] for this purpose. This tool provides various ways of generating tagged versions of the OANC corpus. For this project, I chose to generate the corpus in CoNLL format (that used by the Conference on Natural Language Learning). This format represents each text as a tab-delimited text file, so that each word in the corpus is one row whose columns contain information about that word's part of speech and lemma.

More information about the ANC Tool may be found [here][ANC-Tool]. Steps for converting the MASC data to CoNLL format with part-of-speech and lemma information are as follows:

1. Download the ANC Tool from the [ANC Tool download page][ANC-Tool] and unzip the folder. **NOTE:** The MASC data uses a slightly different version of the ANC Tool than the regular OANC. Make sure you download the version designed to work with MASC 3.0 ([download link here][ANC-Tool-download]).

    If you have already cloned this repository, you can skip this step; the ANC Tool is located in the `scripts/ANC` folder.

1. If you do not have Java installed on your computer, download it from [here][Java] and then install it on your computer.

1. Run the ANC Tool following the instructions on the [ANC Tool page][ANC-Tool]. The MASC version of the ANC Tool must be run from the command line by navigating to the folder where `ANCTool-x.x.x.jar` is located and entering `run.sh` on the command line.

    If you have `npm` installed on your computer and have cloned this repository, you can skip the above step and simply run `npm run anc` from the command line to start the ANC Tool.

1. The first time you run the ANC Tool, it will ask you to specify the location of a resource header file. Point this to the file `resource-header.xml` located in the root of the MASC data folder you downloaded and click _Accept_.

1. A screen with various settings will appear. Select the following for each setting to apply the part-of-speech tags to the corpus:

    - **Input directory:** Select the folder containing the data for the OANC

    - **Output directory:** Select the location where you would like the new version of the corpus to be generated

    - **Copy directory structure:** Check this box (although leaving it unchecked should not affect the results or scripts in this project)

    - **CoNLL:** Select this tab

    - **Annotation types:** Select _structural markup_

    - **Token Type:** Select _Penn POS tags_

    - **Sentence Type:** Select _Penn_

1. Click the _Process_ button. This will begin converting the corpus, which will take several minutes.

In this repository, the converted corpus is located in the folder `data/English/data`.

#### Converting the Corpus to JSON

When scripting with JavaScript, I find it significantly easier to work with data in <abbr title='JavaScript Object Notation'>JSON</abbr> (JavaScript Object Notation) format rather than raw text files. JSON is a simple text format that is highly human-readable, and can be natively parsed by every major programming language. As such it has become the standard data interchange format for the modern web. More information about the JSON format can be found [here][JSON]. More details about the use of JSON format for linguistic data can be found [here][Daffodil].

To convert the MASC data to JSON format, I wrote a small JavaScript script which traverses a data directory for `.conll` files, and converts them to a JSON file where each word in the corpus is represented by a single JSON object. That JSON object contains the following fields:

  - ID
  - startIndex
  - endIndex
  - token
  - lemma
  - POS

The resulting JSON files are located alongside the original `.conll` file, but with a `.json` extension instead.

To convert the CoNLL-formatted files located in this project, enter the following on the command line:

```cmd
node --experimental-modules --no-warnings scripts/data/convertCoNLL.js data/English/data
```

This will regenerate the JSON files in the MASC data directory (`data/English/data`).

To convert CoNLL-formatted files in another directory, simply replace the directory in the command above (`data/English/data`) with the path to your directory of CoNLL files.

#### Removing Unwanted Data

As mentioned above, data selection occurs at several stages of the data workflow for this project. The MASC data contains many tokens which are not relevant for this study, specifically punctuation and numerals. Rather than run computationally-intense statistical scripts on extraneous data, I elected to remove these unwanted tokens from the data set before moving on to later steps.

To achieve this, I wrote a script that removes these unnecessary tokens from the JSON files generated in the previous step. You can run this script on the command line using the following command:

```cmd
node --experimental-modules --no-warnings scripts/data/removeBadTokens.js data/English/data
```

You can run this script on JSON files in a different directory by replacing `data/English/data` with the path to your directory instead.

### Stage 6: Quantitative Analysis
<!--
All of the statistical data for this project can be generated with a single command:

```cmd
npm run stats
```

This script performs each of the steps outlined below. For each step, I have also provided information on how to run that individual step in the process.
 -->
## Legal

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

## References

* <p id=MarcusSantoriniMarcinkiewicz1993>Marcus, Mitchell, Beatrice Santorini & Mary Ann Marcinkiewicz. 1993. Building a large annotated corpus of English: The Penn Treebank. <cite>Computational Linguistics</cite> 19(2). 313–330.<p>

<!-- Links -->
[ANC-Tool]:          http://www.anc.org/software/anc-tool/
[ANC-Tool-download]: http://www.anc.org/tools/ANCTool-3.0.2.zip
[cloning]:           https://help.github.com/en/articles/cloning-a-repository
[Daffodil]:          https://format.digitallinguistics.io/
[dissertation]:      https://files.danielhieber.com/publications/dissertation.pdf
[Java]:              https://www.java.com/en/
[JSON]:              http://json.org/
[MASC-download]:     http://www.anc.org/data/masc/downloads/data-download/
[OANC]:              http://www.anc.org/
[Node]:              https://nodejs.org/
[npm]:               https://www.npmjs.com/
[tags2dlx]:          https://developer.digitallinguistics.io/tags2dlx/
