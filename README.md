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

This readme documents that process from [Stage 3: Data Collection](#stage-3-data-collection) through [Stage 6: Data Description & Analysis](#stage-6-data-description--analysis). Discussion of the theoretical prerequisites and qualitative analysis of the data may be found in my dissertation document, downloadable [here][dissertation].

### Technical Prerequisites

#### Node.js

Since my preferred programming language is JavaScript, the scripts for this project are written in Node.js, software that allows JavaScript to be run on a local computer. Once Node is installed on your computer, any Node script can be run from the command line with the command `node script.js`.

Node also comes with the Node Package Manager (npm), which allows you to install packages that other programmers have written in Node. Any public package in the npm registry may be installed by running `npm install package-name` from the command line. npm also allows you to run scripts within a project from the command line. For example, this project has a script called `copy-pdf`, which copies the compiled LaTeX PDF from `src/main.pdf` to `dissertation.pdf`. These project-specific scripts can be run on the command line following the format `npm run copy-pdf`.

For more information about Node.js and npm, visit the [Node.js][Node] and [npm][npm] websites.

You will need to download Node and npm in order to run most of the scripts in this project. You can download both pieces of software from the [Node.js web page][Node]. Be sure to download the `Current` version rather than the `LTS` version; otherwise some scripts may not work correctly.

#### Cloning this Repository

In order to run the scripts in this project yourself, or use them with new data, you will need to follow these steps:

1. <dfn>Clone</dfn> this repository (copy it to your local machine). Instructions for cloning a repository may be found [here][cloning].

1. Install the necessary packages for this project by navigating to the root folder of this project in the command line and running `npm install`.

### Stage 3: Data Collection

The data used for the investigation of English in this study come from the [Open American National Corpus][OANC] (<abbr title='Open American National Corpus'>OANC</abbr>), a 15 million word corpus whose data are entirely open access. This corpus comes with part-of-speech tags from several different tag sets. The OANC also comes with a Manually Annotated Sub-Corpus (<abbr title='Manually Annotated Sub-Corpus'>MASC</abbr>) whose annotations have been manually produced, and which include tags for lemmas. For this project I have elected to use just the Manually Annotated Sub-Corpus (MASC) of the OANC, and chosen to use the Penn tag set for part-of-speech annotations. More information about the OANC may be found at the [OANC web page][OANC]. More information about the Penn tag set may be found in Marcus, Santorini, & Marcinkiewicz ([1993](#MarcusSantoriniMarcinkiewicz1993)).

The MASC data may be downloaded from the [MASC download page][MASC-download] in either `zip` or `tar` formats. You will need to unzip the folder after you have downloaded it.

### Stage 4: Data Preparation

<!--

Some of the necessary steps in coding the data (such as tagging the data for part of speech and lemmatizing the corpus) have already been done by the research team behind the OANC, and those annotations are publicly available. All annotations for the OANC, including part-of-speech tags, are *stand-off* annotations, where each annotation is stored in a separate file from the primary data. Therefore as a first step in data preparation, it is necessary to merge the part-of-speech tags directly into the primary data for ease of scripting and additional data coding.

It is therefore necessary to perform several steps to prepare the MASC data for additional data coding and analysis:

1. [tag the corpus for parts of speech](#tagging-the-corpus)
1. [lemmatize the corpus](#lemmatizing-the-corpus)
1. [convert the corpus to JSON format](#converting-the-corpus-to-json)

The following sections detail how to perform each of these steps.

#### Tagging the Corpus

The OANC project provides an ANC Tool for this purpose. This tool produces a version of the corpus where each word in a text is followed by an underscore and then the abbreviation for its part of speech according to the Penn tag set. For example, the following sentence:

```
All hotels accept major credit cards.
```

is converted to the following format:

```
All_DT hotels_NNS accept_VBP major_JJ credit_NN cards_NNS ._.
```

More information about the ANC Tool may be found [here][ANC-Tool]. Steps for applying part-of-speech tags to the OANC are as follows:

1. Download the ANC Tool from the [ANC Tool download page][ANC-Tool] and unzip the folder. If you have already cloned this repository, you can skip this step; the ANC Tool will be located in the `scripts/ANC` folder.

1. If you do not have Java installed on your computer, download it from [here][Java] and then install it on your computer.

1. Run the ANC Tool following the instructions on the [ANC Tool page][ANC-Tool]. It is recommended that you run the tool from the command line following the format `java -Xmx500M -jar ANCTool-x.y.z-jar.jar`. See the [ANC Tool page][ANC-Tool] for complete details. If you have `npm` installed on your computer, you can simply run the ANC Tool from the command line with `npm run anc`.

1. The first time you run the ANC Tool, it will ask you to specify the location of the folder where you placed the OANC data. Select this folder and click _Accept_.

1. A screen with various settings will appear. Select the following for each setting:
  - **Input directory:** Select the folder containing the data for the OANC
  - **Output directory:** Select the location where you would like the new version of the corpus to be generated
  - **Input format:** Select _GrAF_
  - **Encoding (Text):** Select _UTF-8_
  - **Copy directory structure:** Check this box (although leaving it unchecked should not affect the results or scripts in this project)
  - **MonoConc Pro:** Select this tab (this ensures that the corpus will be generated following the format described above)
  - **POS tags:** Select _Hepple (Penn) tags_ to apply the Penn tag set
  - **Separator character:** Leave this set to the underscore `_`

1. Click the _Process_ button. This will begin converting the corpus, which will take several minutes.

In this repository, the converted corpus is located in the folder `data/English/OANC/data`.

#### Converting the Corpus to JSON

When scripting with JavaScript, I find it significantly easier to work with data in <abbr title='JavaScript Object Notation'>JSON</abbr> (JavaScript Object Notation) format rather than raw text files. JSON is a simple text format that is highly human-readable, and can be natively parsed by every major programming language. As such it has become the standard data interchange format for the modern web. More information about the JSON format can be found [here][JSON]. More details about the use of JSON format for linguistic data can be found [here][Daffodil].

To convert the OANC to JSON format, I wrote a small JavaScript script called `tags2dlx`, which converts linguistic texts tagged in MonoConc format (the word followed by an underscore and then the part-of-speech tag) to JSON. More specifically, it converts the text to a JSON format that adheres to the Data Format for Digital Linguistics (<abbr title='Data Format for Digital Linguistics'>Daffodil</abbr>), a standard for representing linguistic texts and other linguistic data in JSON. More information about the `tags2dlx` library and how to use it may be found [here][tags2dlx]. More information about the Data Format for Digital Linguistics may be found [here][Daffodil].

The `tags2dlx` package creates a JSON file for each text in the corpus with the same filename as the original text, but with the `.txt` extension replaced by `.json`. This new file is created in the same folder as the original file.

To use the `tags2dlx` package to convert the OANC corpus in this repository to JSON, run `npm run convert-oanc` from the command line. This will take a few minutes. To use the `tags2dlx` package to convert other data sets, or data that lives elsewhere, follow the instructions in the `tags2dlx` readme, located [here][tags2dlx].

-->

### Stage 5: Data Coding

### Stage 6: Quantitative Analysis

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
[ANC-Tool]:      http://www.anc.org/software/anc-tool/
[cloning]:       https://help.github.com/en/articles/cloning-a-repository
[Daffodil]:      https://format.digitallinguistics.io/
[dissertation]:  https://files.danielhieber.com/publications/dissertation.pdf
[Java]:          https://www.java.com/en/
[JSON]:          http://json.org/
[MASC-download]: http://www.anc.org/data/masc/downloads/data-download/
[OANC]:          http://www.anc.org/
[Node]:          https://nodejs.org/
[npm]:           https://www.npmjs.com/
[tags2dlx]:      https://developer.digitallinguistics.io/tags2dlx/
