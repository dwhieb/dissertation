# Dissertation

This repository contains the data and source code for my Ph.D. dissertation in linguistics at the University of California, Santa Barbara.

## Replicating the Results of this Study

A self-imposed requirement for this project is that of empirical accountability and replicability. This readme therefore documents the steps to follow in order to reproduce the results of this study, whether using the same data employed in my dissertation, or on a new data set entirely. A secondary consequence of this prerequisite is that all of the data used for this study are publicly available under an open license.

The process of obtaining the results from this study, as in all empirical scientific studies, can be divided into several stages:

1. theoretical prerequisites
2. data selection
3. [data collection](#stage-3-data-collection)
4. [data preparation](#stage-4-data-preparation)
5. data coding
6. [quantitative analysis](#stage-6-quantitative-analysis)
7. qualitative analysis

There are not always clear boundaries between each stage (for example, a data selection step occurs at several places), but the above steps nonetheless provide a useful overview of the process.

This readme documents the technical steps relating to [data collection](#stage-3-data-collection), [data preparation](#stage-4-data-preparation), and [quantitative analysis](#stage-6-quantitative-analysis). Discussion of the theoretical prerequisites, data coding, and qualitative analysis of the data may be found in my dissertation document, downloadable [here][dissertation].

### Technical Prerequisites

#### Cloning this Repository

This project and all its accompanying data and code are stored in a repository on [GitHub][GitHub]. In order to run the scripts in this project yourself, or use them with new data, you will need to clone this repository (copy it to your local machine), by following the instructions [here][cloning]. When this is done, all the necessary scripts will be on your computer, available for you to run.

#### R

The programming language R is one of the most widely-used programming languages for data science and statistical analysis. It is open source, and its quality and ongoing maintenance are ensured by the [R Foundation for Statistical Computing][R-Foundation]. The language is well documented, and there exists a vibrant community of developers, forums, and open-source packages for the language. Especially given that it is the most common programming language used for data preparation and statistical analysis in linguistics, I have elected to use R for all data-related scripts for this thesis.

You will need to download R from the [R website][R] in order to run the scripts for this project. I also personally recommend downloading the free version of [RStudio][RStudio], which provides a convenient user interface for working with R scripts. If you are using RStudio, and once you have this repository cloned to your computer, you can open this R project by selecting `File > Open Project` in RStudio, navigating to the folder where you cloned this repository, and then selecting the file `dissertation.Rproj`.

### Stage 3: Data Collection

As mentioned above, all the data in this study are publicly available. This section presents the necessary steps for obtaining that data. Note that this repository does not contain the primary data itself, just annotations, statistics, and other accompanying data that is produced from the original data. The primary data itself lives in various places online, described below.

The data used for the investigation of English in this study come from the [Open American National Corpus][OANC] (<abbr title='Open American National Corpus'>OANC</abbr>), a 15 million word corpus whose data are entirely open access. This corpus comes with part-of-speech tags from several different tag sets. The OANC includes a Manually Annotated Sub-Corpus (<abbr title='Manually Annotated Sub-Corpus'>MASC</abbr>) of approximately 500,000 words whose annotations have been manually produced, and which include tags for lemmas. For this project I have elected to use just the Manually Annotated Sub-Corpus (MASC) of the OANC, and chosen to use the Penn tag set for part-of-speech annotations and lemmatization. More information about the OANC may be found at the [OANC web page][OANC]. More information about the Penn tag set may be found in Marcus, Santorini, & Marcinkiewicz ([1993](#MarcusSantoriniMarcinkiewicz1993)).

The MASC data may be downloaded from the [MASC download page][MASC-download] in either `zip` or `tar` formats. You will need to unzip the folder after you have downloaded it.

### Stage 4: Data Preparation

Preparing the MASC data for additional annotation and statistical analysis involves the following steps:

1. [apply stand-off annotations](#applying-stand--off-annotations)
1. [remove unwanted data](#removing-unwanted-data)

Details for accomplishing each of these tasks are given in the sections below.

#### Applying Stand-Off Annotations

Some types of annotations, such as part-of-speech and lemma information, have already been produced by the research team behind the OANC. These annotations are freely available for download along with the OANC data itself. All annotations for the OANC are *stand-off* annotations, where each annotation is stored in a separate file from the primary data. Therefore as a first step in data preparation, it is necessary to merge the part-of-speech and lemma information directly into the primary data for ease of scripting and additional data coding.

The OANC project provides an [ANC Tool][ANC-Tool] for this purpose. This tool provides various ways of generating tagged versions of the OANC corpus. For this project, I chose to generate the corpus in CoNLL format (that used by the Conference on Natural Language Learning). This format represents each text as a tab-delimited text file, so that each word in the corpus is one row whose columns contain information about that word's part of speech and lemma.

More information about the ANC Tool may be found [here][ANC-Tool]. Steps for converting the MASC data to CoNLL format with part-of-speech and lemma information are as follows:

1. Download the ANC Tool from the [ANC Tool download page][ANC-Tool] and unzip the folder. **NOTE:** The MASC data uses a slightly different version of the ANC Tool than the regular OANC. Make sure you download the version designed to work with MASC 3.0 ([download link here][ANC-Tool-download]).

    If you have already cloned this repository, you can skip this step; the ANC Tool is located in the `scripts/ANC` folder.

1. If you do not have Java installed on your computer, download it from [here][Java] and then install it on your computer.

1. Run the ANC Tool following the instructions on the [ANC Tool page][ANC-Tool]. The MASC version of the ANC Tool must be run from the command line by navigating to the folder where `ANCTool-x.x.x.jar` is located and entering `run.sh` on the command line.

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

#### Removing Unwanted Data

As mentioned above, data selection occurs at several stages of the data workflow for this project. The MASC data contains many tokens which should not be included in any frequency counts, specifically punctuation and the possessive `'s` (which is treated as a separate token by the OANC). The CoNLL files also contain several columns which contain unnecessary data. Rather than run computationally-intense statistical scripts on extraneous data, I created cleaned versions of each CoNLL file with the extraneous data removed, and saved these as `.tsv` files alongside their original `.conll` files.

To accomplish this, I wrote an R script called `clean_data.R`, located at `scripts/data/prepare_data.R`. Running this script will generate a cleaned version of each CoNLL in the data directory in this repository. To run this script on a data directory located elsewhere, simply change the `data_dir` variable at the top of the file to point to the directory where your data are located.

### Stage 6: Quantitative Analysis

Once the data are prepared and stored as JSON files, they are ready for statistical analysis. For this project, I generated the following statistical data:

- [wordform frequencies](#wordform-frequencies)
- [lexeme frequencies](#lexeme-frequencies)
- [archlexeme frequencies](#archlexeme-frequencies)

All of the statistical data for this project can be generated with a single command:

```cmd
npm run stats
```

Alternatively, the procedures for generating each type of statistical data are covered in the sections below.

#### Wordform Frequencies

The raw frequencies of each wordform in the corpus may be generated by running the following on the command line:

```cmd
node --experimental-modules --no-warnings scripts/bin/generateWordforms.js {data directory} {output path}
```

Replace `{data directory}` with the path to the data directory (`data/English/data` in this project) and `{output path}` with the path to the file where you would like the resulting tab-separated file saved (`data/English/stats/wordforms.tsv` in this project).

The script will generate a tab-delimited file (`.tsv`) containing each wordform in the corpus and its token frequency, and will look similar to the table below.

Wordform | Frequency
-------- | ---------
the_DT   | 26116
to_TO    | 13480
and_CC   | 12527
of_IN    | 12000
a_DT     | 9748

#### Lexeme Frequencies

The raw frequencies of each lexeme in the corpus may be generated by running the following on the command line:

```cmd
node --experimental-modules --no-warnings scripts/bin/generateLexemes.js {data directory} {output path}
```

Replace `{data directory}` with the path to the data directory (`data/English/data` in this project) and `{output path}` with the path to the file where you would like the resulting tab-separated file saved (`data/English/stats/lexemes.tsv` in this project).

The script will generate a tab-delimited file (`.tsv`) containing each lexeme in the corpus and its token frequency, and will look similar to the table below.

Lexeme | Frequency
------ | ---------
the_DT | 26116
to_TO  | 13480
and_CC | 12528
of_IN  | 11999
a_DT   | 9748

#### Archlexeme Frequencies

The raw frequencies of each archlexeme (a lexeme that crosses traditional part-of-speech boundaries) in the corpus may be generated by running the following on the command line:

```cmd
node --experimental-modules --no-warnings scripts/bin/generateArchlexemes.js {data directory} {output path}
```

Replace `{data directory}` with the path to the data directory (`data/English/data` in this project) and `{output path}` with the path to the file where you would like the resulting tab-separated file saved (`data/English/stats/archlexemes.tsv` in this project).

The script will generate a tab-delimited file (`.tsv`) containing each lexeme in the corpus and its token frequency, and will look similar to the table below.

Archlexeme | Frequency
---------- | ---------
the	       | 26137
be	       | 19018
to	       | 13548
and	       | 12528
of	       | 12005

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
[GitHub]:            https://github.com/dwhieb/dissertation
[Java]:              https://www.java.com/en/
[JSON]:              http://json.org/
[MASC-download]:     http://www.anc.org/data/masc/downloads/data-download/
[OANC]:              http://www.anc.org/
[Node]:              https://nodejs.org/
[npm]:               https://www.npmjs.com/
[R]:                 https://www.r-project.org/
[R-Foundation]:      https://www.r-project.org/foundation/
[RStudio]:           https://www.rstudio.com/
[tags2dlx]:          https://developer.digitallinguistics.io/tags2dlx/
