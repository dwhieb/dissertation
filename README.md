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
6. [data description / analysis](#stage-6-data-description--analysis)
  - [frequency counts](#frequency-counts)
  - [descriptive statistics](#descriptive-statistics)
  - [exploratory statistics](#exploratory-statistics)
  - [inferential / predictive statistics](#inferential--predictive-statistics)
7. qualitative analysis

This readme documents that process from [Stage 3: Data Collection](#stage-3-data-collection) through [Stage 6: Data Description & Analysis](#stage-6-data-description--analysis). Discussion of the theoretical prerequisites and qualitative analysis of the data may be found in my dissertation document, downloadable [here][dissertation].

### Stage 3: Data Collection

<!-- This section summarizes how to obtain each of the original data sets used in this study. -->

The data used for the investigation of English in this study come from the [Open American National Corpus][OANC] (<abbr title='Open American National Corpus'>OANC</abbr>), a 15 million word corpus whose data are entirely open access. This corpus comes with part-of-speech tags from several different tag sets. The OANC also comes with a Manually Annotated Sub-Corpus (<abbr title='Manually Annotated Sub-Corpus'>MASC</abbr>) whose annotations have been manually produced. For this project I have elected to use the entirety of the OANC rather than just the Manually Annotated Sub-Corpus, and chosen to use the Penn tag set for part-of-speech annotations. More information about the Penn tag set may be found in Marcus, Santorini, & Marcinkiewicz ([1993](#MarcusSantoriniMarcinkiewicz1993)).

The OANC corpus may be downloaded from the [OANC Download page][OANC-download] in either `zip` or `tar` formats. Note that it is a large download (~5GB) and will take some time to download completely. You will also need to unzip the folder after you have downloaded it.

### Stage 4: Data Preparation

All annotations for the OANC, including part-of-speech tags, are <dfn>stand-off</dfn> annotations, where each annotation is stored in a separate file from the primary data. Therefore as a first step in data preparation, it is necessary to merge the part-of-speech tags directly into the primary data for ease of scripting. The OANC project provides an ANC Tool for this purpose. This tool produces a version of the corpus where each word in a text is followed by an underscore and then the abbreviation for its part of speech according to the Penn tag set. For example, the following sentence:

```
All hotels accept major credit cards.
```

is converted to the following format:

```
All_DT hotels_NNS accept_VBP major_JJ credit_NN cards_NNS ._.
```

More information about the ANC Tool may be found [here][ANC-Tool]. Steps for applying part-of-speech tags to the OANC are as follows:

1. Download the ANC Tool from the [ANC Tool download page][ANC-Tool] and unzip the folder.

1. If you do not have Java installed on your computer, download it from [here][Java] and then install it on your computer.

1. Run the ANC Tool following the instructions on the [ANC Tool page][ANC-Tool]. It is recommended that you run the tool from the command line following the format `java -Xmx500M -jar ANCTool-x.y.z-jar.jar`. See the [ANC Tool page][ANC-Tool] for complete details. If you have `npm` installed on your computer and have downloaded this repository, you can run the ANC Tool from the command line with `npm run anc`.

1. The first time you run the ANC Tool, it will ask you to specify the location of the folder where you placed the OANC data. Select this folder and click _Accept_.

1. A screen with various settings will appear. Select the following for each setting:

  - **Input directory:** Select the folder containing the data for the OANC
  - **Output directory:** Select the location where you would like the new version of the corpus to be generated
  - **Input format:** Select _GrAF_
  - **Encoding (Text):** Select _UTF-8_
  - **Copy directory structure:** Check this box (although leaving it unchecked should not affect the results or scripts in this project)
  - **MonoConc:** Select this tab (this ensures that the corpus will be generated following the format described above)
  - **POS tags:** Select _Hepple (Penn) tags_ to apply the Penn tag set
  - **Separator character:** Leave this set to the underscore `_`

1. Click the _Process_ button. This will begin converting the corpus, which will take several minutes.

In this repository, the converted corpus is located in the folder `data/English/OANC/data`.

### Stage 5: Data Coding

### Stage 6: Data Description & Analysis

#### Frequency Counts

#### Descriptive Statistics

#### Exploratory Statistics

#### Inferential / Predictive Statistics

## Legal

Currently, none of the materials in this repository are licensed for copying, reproduction, redistribution, modification, or reuse. Please contact [Daniel W. Hieber](https://danielhieber.com) if you wish to use any of the materials in this repository.

### Todo

(see issue #[549](https://github.com/dwhieb/dissertation/issues/549))

Add copyright and license for each section of this repository

- [ ] document (copyright to me, licensed under CC BY 4.0)
- [ ] corpora
  - [ ] OANC (copyright, license)
  - [ ] SBC (copyright,  license)
- [ ] comics (individual copyrights)
- [ ] scripts
  - [ ] ANC tool
  - [ ] my scripts (MIT license)

## References

* <p id=MarcusSantoriniMarcinkiewicz1993>Marcus, Mitchell, Beatrice Santorini & Mary Ann Marcinkiewicz. 1993. Building a large annotated corpus of English: The Penn Treebank. <cite>Computational Linguistics</cite> 19(2). 313–330.<p>

<!-- Links -->
[ANC-Tool]:      http://www.anc.org/software/anc-tool/
[dissertation]:  https://files.danielhieber.com/publications/dissertation.pdf
[Java]:          https://www.java.com/en/
[OANC]:          http://www.anc.org/
[OANC-download]: http://www.anc.org/data/oanc/download/
