# Dissertation

This repository contains the data and source code for my Ph.D. dissertation in linguistics at the University of California, Santa Barbara.

A self-imposed requirement for this project is that of empirical accountability and replicability. **This readme documents the steps to reproduce the results of this study,** whether using the same data employed in my dissertation, or a new data set entirely.

## Conventions

### Statistical Significance

p-value            | Description
-------------------|----------------------------
`0.1 ≤ p < 1`      | not significant (ns)
`0.05 ≤ p < 0.1`   | marginally significant (ms)
`0.01 ≤ p < 0.05`  | significant (`*`)
`0.001 ≤ p < 0.01` | very significant (`**`)
`p < 0.001`        | highly significant (`***`)

### Statistical Correlation

Correlation Coefficient | Description    | Type
:-----------------------|----------------|---------
`0.7 < r <= 1`          | very high      | positive
`0.5 < r <= 0.7`        | high           | positive
`0.2 < r <= 0.5`        | intermediate   | positive
`0 < r <= 0.2`          | low            | positive
`r ≈ 0`                 | no correlation | (H0)
`0 > r >= -0.2`         | low            | negative
`-0.2 > r >= -0.5`      | intermediate   | negative
`-0.5 > r >= -0.7`      | high           | negative
`-0.7 > r >= -1`        | very high      | negative

## Contents

<!-- TOC -->

- [1. Introduction](#1-introduction)
- [2. Technical Prerequisites](#2-technical-prerequisites)
  - [Cloning this Repository](#cloning-this-repository)
  - [Running Scripts](#running-scripts)
  - [Installing the Project](#installing-the-project)
- [3. Data Collection](#3-data-collection)
  - [English](#english)
  - [Nuuchahnulth](#nuuchahnulth)
- [4. Data Preparation](#4-data-preparation)
  - [English](#english-1)
    - [Tokenizing the OANC](#tokenizing-the-oanc)
    - [Converting the OANC to JSON](#converting-the-oanc-to-json)
  - [Nuuchahnulth](#nuuchahnulth-1)
- [5. Data Annotation](#5-data-annotation)
  - [English](#english-2)
    - [Selecting Words for Annotation](#selecting-words-for-annotation)
    - [Generating the Annotations File](#generating-the-annotations-file)
    - [The Annotation Process](#the-annotation-process)
  - [Nuuchahnulth](#nuuchahnulth-2)
- [7. Statistical Analysis](#7-statistical-analysis)
  - [Descriptive Statistics](#descriptive-statistics)
    - [Archlexeme Frequencies](#archlexeme-frequencies)
    - [Archlexeme Corpus Dispersions](#archlexeme-corpus-dispersions)
  - [Inferential Statistics](#inferential-statistics)
- [8. References](#8-references)
- [9. Legal](#9-legal)

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

While the inferential statistics and data visualization for this thesis were produced using the [R programming language][R], R is not well suited to large-scale data manipulation or processing of large files (Adler [2010](#Adler2010): 157–158). Therefore it is generally recommended that data preprocessing be conducted using other programming languages. In linguistics, this is typically done with Python. However, since I am proficient in JavaScript and not Python, the scripts for this project are written in JavaScript (specifically Node.js, which runs JavaScript on a local computer). JavaScript (via Node.js) is however gaining traction in data science, a trend which is expected to continue.

Node also comes with the Node Package Manager (<abbr title='Node package manager'>npm</abbr>), which allows you to install packages that other programmers have written in Node. Any public package in the npm registry may be installed by running `npm install {package-name}` from the command line in the folder you would like to install it in.

For more information about Node.js and npm, visit the [Node.js][Node] and [npm][npm] websites.

You will need to download Node and npm in order to run many scripts in this project. You can download both pieces of software at once from the [Node.js web page][Node]. The scripts in this repository were written using Version 14 of Node, so you may need to download that specific version in order for the scripts in this project to work correctly.

Once Node is installed on your computer, any Node script can be run from the command line with the command `node {path-to-script}`.

npm also allows you to save commonly-used command line commands as project-specific scripts, saving you from having to retype the command and all its arguments each time you want to run it. A few of the scripts in this repository have been made into this kind of project-specific script, and can be run from the command line following the format `npm run {script-name}`.

### Installing the Project

Once you have cloned this repository and installed npm and Node, install the necessary packages for this project by navigating to the root folder of the repository in the command line and running `npm install`.

([back to top](#readme))

## 3. Data Collection

All the data in this study are publicly available. This section describes the necessary steps for obtaining those data.

### English

The data used for the investigation of English come from the [Open American National Corpus][OANC] (<abbr title='Open American National Corpus'>OANC</abbr>), a 15 million word corpus whose data are entirely open access. Since most linguistic data on small, endangered, and/or indigenous languages come from spoken corpora, I elected to use just the spoken portion of the OANC for comparability. This portion of the corpus totals 3,217,772 tokens, and is composed of two distinct subcorpora—the [Charlotte Narrative & Conversation Collection][Charlotte] (<abbr title='Charlotte Narrative &amp; Conversation Collection'>CNCC</abbr> or simply "the Charlotte corpus") and the [Switchboard Corpus][Switchboard]. More details about the Charlotte corpus may be found [here][Charlotte], and the Switchboard corpus [here][Switchboard].

The OANC may be downloaded in its entirety from from the [OANC download page][OANC-download] in `.zip` or `.tgz` formats. You will need to unzip the folder after you have downloaded it. Inside the downloaded folder, the spoken portion of the corpus is in `data/spoken`.

In this repository, the English data are located in `data/English/texts`.

### Nuuchahnulth

The data used for the investigation of Nuuchahnulth comes from a corpus of texts collected and edited by Toshihide Nakayama, and published in Nakayama ([2003a](#Nakayama2003a), [2003b](#Nakayama2003b)). I manually typed the corpus as simple text files, using a computationally-parseable format for representing linguistic texts known as [scription][scription]. The resulting digitally-searchable corpus is available [on GitHub][Nuuchahnulth].

The Nuuchahnulth corpus consists of 24 texts dictated by two speakers, containing 2,081 utterances, and 8,366 tokens (comprising 4,216 types).

In this repository, the Nuuchahnulth data are located in `data/Nuuchahnulth/texts`.

([back to top](#readme))

## 4. Data Preparation

This section covers steps for converting and otherwise preparing the data used in this study for annotation and analysis.

When scripting with JavaScript, I find it significantly easier to work with data in [<abbr title='JavaScript Object Notation'>JSON</abbr>][JSON] (JavaScript Object Notation) format rather than raw text files. JSON is a simple text format that is highly human-readable, and can be natively parsed by every major programming language. As such it has become the standard data interchange format for the modern web. More information about JSON format can be found [here][JSON]. More details about the use of JSON format for linguistic data can be found [here][DaFoDiL]. This section shows how to convert the data for this study to JSON for further annotation.

### English

This section covers the steps for converting the English OANC data to JSON format.

#### Tokenizing the OANC

For the OANC, converting the data to JSON involves first tokenizing the corpus. The OANC project provides an [ANC Tool][ANC-Tool] for this purpose, which offers various ways of converting and tagging OANC data. More information about the ANC Tool may be found [here][ANC-Tool]. Steps for tokenizing the OANC using the ANC Tool are as follows:

1. Download the ANC Tool from the [ANC Tool download page][ANC-Tool] and unzip the folder. If you have already cloned this repository, you may skip this step; the ANC Tool is located in the `data/English/scripts/ANC` folder.

1. If you do not have Java installed on your computer, download it from [here][Java] and then install it on your computer.

1. Run the ANC Tool from the command line using `npm run anc`. Alternatively, you can run the ANC Tool following the instructions on the [ANC Tool page][ANC-Tool]. It is recommended that you run the tool from the command line following the format `java -Xmx500M -jar ANCTool-x.y.z-jar.jar`. See the [ANC Tool page][ANC-Tool] for complete details.

1. The first time you run the ANC Tool, it will ask you to specify the location of the folder where the files `annotations.xml` and `OANC-corpus-header.xml` are located. Find this folder where you downloaded them and click _Accept_.

1. A screen with various settings will appear. Select the following:

    - **Input Directory:** Select the folder containing the data you wish to tokenize.
    - **Output Directory:** Select the location where you would like the new version of the corpus to be generated. Make sure this folder is **different** from the input directory.
    - **Input Format:** Select _GrAF_.
    - **Encoding (Text):** Select _UTF-8_.
    - **Copy Directory Structure:** Check this box. (However, leaving it unchecked should not affect the scripts in this project.)
    - **MonoConc Pro**: Select this tab.
    - **Part of Speech:** Select _Hepple part of speech tags_
    - **Separator Character:** Leave this set to the underscore (`_`)

1. Click the _Process_ button. This will begin converting the corpus, which will take several minutes. This converts each text in the OANC to a new text file (`.txt`) that is tokenized and tagged for part of speech.

#### Converting the OANC to JSON

To convert the OANC to JSON, I used a JavaScript library called [`tags2dlx`][tags2dlx], which I wrote and published for this purpose. It takes a directory of texts tagged for part of speech (where each word token is followed by an underscore and then its part-of-speech tag) and converts it to a JSON file. More information about the `tags2dlx` library may be found [here][tags2dlx].

To convert the OANC, follow the instructions for using the `tags2dlx` library, which can be found [here][tags2dlx]. In this repository, the converted files are located in `data/English/texts`, and end in a `.json` extension.

### Nuuchahnulth

Since the [Nuuchahnulth corpus][Nuuchahnulth] was already available in DLx JSON format, no further preprocessing of the data was necessary. Once the JSON versions of the Nuuchahnulth texts were copied into this project, they were ready for annotation and analysis.

([back to top](#readme))

## 5. Data Annotation

This section covers the technical steps involved in the process of annotating the data for this study.

### English

#### Selecting Words for Annotation

100 archlexemes were selected from the English corpus for annotation (see [my dissertation][dissertation] for a definition of the notion of <dfn>archlexeme</dfn>). These archlexemes were chosen randomly from the set of wordforms in the corpus, by first dividing those wordforms into 100 different bins depending on the corpus dispersion of that wordform (measured using <dfn>Deviation of Proportions</dfn> (<abbr title='Deviation of Proportions'>DP</abbr>) [Gries [2008](#Gries2008)]), and then selecting one word randomly from each bin. Words which did not meet the selection criteria were thrown out, and the process was repeated until 100 viable archlexemes were found. The selection criteria for archlexemes are discussed in the Data & Methods chapter of my dissertation document, available [here][dissertation].

The following script produces a tab-delimited file listing each wordform in the corpus, its raw frequency, and its corpus dispersion. It also prints the total size of the corpus to the console.

```cmd
node stats/scripts/bin/getStatistics.js {path-to-data-directory} --out {output-path} --unit wordform --filter data/English/scripts/tokenFilter.js
```

The `--unit` option specifies that you want statistics for wordforms rather than lexemes, and the `--filter` option points to a filtering function, which tells the script to ignore certain tokens in the corpus. In particular, the script filters out unwanted tokens from the data (without affecting the calculation of dispersion). It relies on two files: `excludeList.yml` and `nonLexicalTags.yml`, both located in the `data/English/scripts/constants` folder. The `excludeList.yml` file contains a list of wordforms that should not be included in the list of wordforms (but again, without affecting calculation of dispersion, or the overall reported corpus frequency). Similarly, the `nonLexicalTags.yml` file contains Penn tags which should be excluded from the resulting wordlist. You can update either of these files to change the words which are filtered out of the English data.

The resulting file of English wordform frequencies is located at `stats/data/English_wordforms.csv`.

---

Having generated the list of wordforms and their statistics, I then wrote an R script which bins wordforms based on their corpus dispersions, generates a list of 100 suggested wordforms (one from each dispersion bin) and saves it to a text file. This script is located in `data/selectWordforms.R`. You can adjust the `input_path` and `output_path` variables at the top of the file to point it to the lists of wordforms generated in the previous step, and the location where you would like the list of selected wordforms to be generated, respectively.

Finally, I used this list of suggested wordforms to pick which archlexemes I wanted to annotate. If a suggested wordform didn't meet the selection criteria, I added it to `excludeList.yml` and regenerated the list of wordforms. Occasionally, in the higher frequencies, there were no wordforms in that dispersion bin. When this happened, I selected a word from the next lowest dispersion bin, with the result that a few bins are represented more than once in the annotated data.

The final list of 100 archlexemes was created manually, and is located in `data/English/selected_archlexemes.txt`.

After this was done, I next created a list of every possible inflected wordform of the 100 archlexemes that were selected for annotation. Morphologically derived forms were not included, but suppletive inflectional variants were included. Thus for the archlexeme _know_, I included the following wordforms:

- _knew_
- _know_
- _knowing_
- _known_
- _knows_

Some of these wordforms also function as morphologically derived words. This is the result of the fact that certain morphemes in English, like _‑ing_, have both inflectional and derivational uses. For thoroughness, I included both inflectional and derivational uses in the list of tokens to annotate. However, whenever I encountered a derivational use of one of these words during the data annotation process, I did not annotate it, since this study is focused on only morphologically unmarked derivation, i.e. conversion.

The list also includes some seemingly unusual wordforms. For example, the forms of the archlexeme _one_ are as follows:

- _one_
- _ones_
- _oned_
- _oning_
- _onning_

Including the strange-looking verbal forms of _one_ allow the script to find any potential predicative uses of the word _one_ in addition to modificational or referential uses. While there are no such predicative uses of _one_ in the OANC, examples can easily be found online, such as the following:

> What might be if we were **Oned**? United, as we would say (David Grieve, _Love in thin places_)

Therefore it was necessary to construct the list of wordforms in such a way as to allow the possibility of finding even seemingly unlikely or impossible cases of conversion.

For English, I did not have to include possessive forms in the list of wordforms because `'s` is tokenized as a separate word by the OANC.

The resulting list of English wordforms to annotate is located in `data/English/selected_wordforms.json`.

#### Generating the Annotations File

To make annotations on the English data, I created a spreadsheet of each of the ~380,000 tokens in [Keyword-in-Context][KWIC] (KWIC) format, allowing me to see the immediately preceding and following context for each token. The columns included in the annotation spreadsheet are below.

Column Name | Description
------------|------------------------------------------------------------------------------------------------------------------------------------------------------------
language    | The ISO 639-3 code for the language of this observation.
text        | The name of the text that the token appears in.
utterance   | The number of the utterance within the text that the token appears in. (Numbering starts at 1.)
word        | The number of the word within the utterance that the token appears in. (Numbering starts at 1.)
archlexeme  | The archlexeme that this word token and lexeme belongs to.
function    | The discourse function of this word token. See table below.
pre         | The words in the utterance preceding the token.
token       | A transcription of the word token being annotated. This may also be called the <dfn>wordform</dfn>. It does not include any prosodic markup or punctuation.
post        | The words in the utterance following the token.
translation | A translation of the utterance that the word token appears in. This was not included for English data.

Rather than copy-paste each token and its surrounding context into this spreadsheet, I utilized the [DLx concordance library][dlx-concordance], a tool I wrote and published which takes a list of wordforms, finds every instance of those wordforms in a DLx (JSON) formatted corpus, and generates a tab-delimited list of tokens in Keyword-in-Context format. You can run this script on the command line as follows (making sure you've installed either this project, or the `@digitallinguistics/concordance` library first):

```cmd
node node_modules/@digitallinguistics/concordance/concordance.js --dir={directory} --KWIC --outputPath={output path} --wordlist={wordlist}
```

In this command, `{directory}` is the path to the directory where the corpus is located, `--KWIC` indicates that the concordance should be generated in Keyword-in-Context format, `{output path}` is the path where you would like the concordance file generated, and `{wordlist}` is the path to the JSON file containing an array of wordforms to concordance (the `selected_wordforms.json` file generated in the previous section).

The resulting concordance file for English is stored in `data/English/tokens.tsv`.

You can generate a concordance using a different corpus, list of words, or other options by following the usage instructions for the [DLx concordance library][dlx-concordance].

#### The Annotation Process

Once the tab-separated concordance in KWIC format was generated for English, I was able to open it using Microsoft Excel and manually annotate all ~380,000 tokens for reference, predication, and modification. The resulting annotations are saved in `data/English/annotations` in both Excel and TSV formats.

The following codes were used in the annotation of the data (in the `function` column).

Code | Description
-----|-----------------------
C    | predicate construction
G    | gerund
I    | infinitive
M    | modification
P    | predication
R    | reference
X    | other

Predicate constructions refer to nominal predication, adjectival predication, etc.

#### Applying the Annotations to the Corpus

After each of the selected tokens was annotated for its pragmatic function (reference, predication, or modification), those tags needed to be applied back to the original JSON corpus. This can be done with the following script:

```cmd
node data/English/scripts/bin/applyTags.js data/English/annotations/annotations.tsv data/English/texts
```

This script can be adjusted slightly to determine how it is that the tags on the data map to discourse functions. In particular, it is debatable whether items tagged as gerunds or infinitives should be considered referential in nature, and thus tagged as `REF`, or excluded from the data; likewise it is unclear whether predicate nominals and predicate adjectives should be considered predicative in nature, and thus tagged as `PRED`, or excluded from the data. By updating the `functions` object in the `applyTags.js` script, it is possible to adjust these mappings.

### Nuuchahnulth

Because the size of the Nuuchahnulth corpus is significantly smaller than that of the English corpus, it was not necessary to select a subset of the data to code. Instead, it was possible to annotate every lexical item in the corpus. Since the Nuuchahnulth corpus consists of interlinear glossed texts, it was also possible to programmatically lemmatize and tag a portion of the corpus.

To lemmatize the corpus (that is, identify the stem of each token), run the following script:

```cmd
node data/Nuuchahnulth/scripts/lemmatize.js
```

To oversimplify the grammatical discussion somewhat, this script strips away the grammatical morphemes within each token, leaving just the lexical core of the word. This set of lexical morphemes is then set as the `"stem"` property on the word. For example, the word _c̓us-ʼi·tap-ʼaƛ_ 'dig-on.the.ground-FINITE' is lemmatized as _c̓us-ʼi·tap_ 'dig-on.the.ground'. This is considered the stem of the word.

This script also identifies the root of each word, and sets this as the `"root"` property.

Next, I programmatically tagged words in the corpus for its pragmatic function based on their morphology. This is accomplished with the following script:

```cmd
node data/Nuuchahnulth/scripts/addMorphologicalTags.js
```

This script adds a `function` tag to each word in the corpus based on that word's morphology. For example, if a word has the definite suffix _‑ʔiˑ_ it is marked as a referent. The value of this tag is either `REF` (reference), `PRED` (predication), or `PRED-REF` (ambiguous between predication and reference; this applies specifically to words which have a indefinite relative suffix). Because words tagged as `PRED-REF` are categorially ambiguous in isolation, I further examined each of these cases (187 instances) and manually updated the tag to either `PRED` or `REF` as appropriate.

Tagging the corpus by morphological part of speech resulted in 37% coverage. That is, 37% of tokens (3,123 out of 8,366) overtly indicate their pragmatic function in their morphology.

#### The Annotation Process

To annotate the remaining 63% of the Nuuchahnulth corpus for pragmatic function, I utilized the [Lotus][Lotus], an browser-based web application which allows linguists to manage and analyze their linguistic data. Since the Nuuchahnulth data were already in the [JSON format][DaFoDiL] required for use with this tool, I simply imported the texts into Lotus, and then used the Tagger tool to tag each token for reference, predication, or modification. The full set of tags used is below.

Tag                 | Description
--------------------|---------------------------------------------------
`function: English` | Item is a word or phrase in English.
`function: INTJ`    | Item is an interjection.
`function: MOD`     | Item is being used to modify.
`function: PRED`    | Item is being used to predicate.
`function: REF`     | Item is being used to refer.
`function: X`       | Item is sound-imitative, a discourse hesitation, a conjunction (_waa_ 'and', _ʔuḥ_ 'and'), a complementizer (_ʔan_ 'that, because'), a vocative/exclamative, or a mention rather than a use.

When all 8,366 tokens were tagged, I then exported the corpus from Lotus and merged the new tags back into the existing corpus. Since the Lotus app exports a single file, this required a small script:

```cmd
node data/Nuuchahnulth/scripts/parseLotusExport.js {path-to-export-file}
```

Note that this script merges newer tags into the corpus in this repository. It does not overwrite the existing files.

([back to top](#readme))

## 7. Statistical Analysis

This section outlines the steps for creating descriptive and inferential statistics for the annotated English and Nuuchahnulth datasets.

<!-- TODO: cite packages used -->

### Descriptive Statistics

#### Stem Frequencies & Dispersions

The following script calculates various statistics regarding the frequencies and dispersions of each archlexeme in the corpus. It produces a single tab-delimited file with columns for each statistic.

```cmd
node stats/scripts/bin/getStatistics.js {dataDir} --out {outputPath} --unit "stem" --filter data/English/scripts/tokenFilter.js
```

You will need to run this script once for English and once for Nuuchahnulth.

For English, it is important to include a `--filter` option whose value is set to the above. This excludes unwanted tokens from the results.

Option     | Description
-----------|--------------------------------------------------
dataDir    | The path to the directory of JSON versions of the texts for a language
`--filter` | The path to a file which exports a filter function. This function should accept a Word object as its argument, and return true if the word should be included in the wordform/lexemes list, false if it should not. Allows the user to filter out unwanted tokens.
`--out`    | The path to the file where you would like the results outputted
`--unit`   | Whether to calculate statistics by `wordform`, `stem`, or `root`.

The columns in the resulting file are as follows:

Column     | Description
-----------|------------------------------------------------------------------------------------------------------------------------------------
lexeme     | The lexeme which the statistics refer to.
frequency  | The raw frequency with which the lexeme occurs in the corpus.
dispersion | The corpus dispersion of the lexeme. Corpus dispersions are measured as a Deviation of Proportions (DP) (Gries [2008](#Gries2008)).
REF        | The number of times that the lexeme was used for reference in the corpus.
PRED       | The number of times that the lexeme was used for predication in the corpus.
MOD        | The number of times that the lexeme was used for modification in the corpus.

### Inferential Statistics

([back to top](#readme))

## 8. Errata

This section will contain any errata discovered after the dissertation was filed. This repository will always contain the latest, corrected version of the dissertation.

## 9. References

* <p id=Adler2010>Adler, Joseph. 2010. <cite>R in a nutshell: A quick desktop reference</cite>. O'Reilly.</p>

* <p id=Gries2008>Gries, Stefan Th. 2008. Dispersions and adjusted frequencies in corpora. <cite>International Journal of Corpus Linguistics</cite> 13(4): 403–437. DOI:<a href=https://doi.org/10.1075/ijcl.13.4.02gri>10.1075/ijcl.13.4.02gri</a>.</p>

* <p id=Nakayama2003a>Nakayama, Toshihide. 2003. Caroline Little's Nuu-chah-nulth (Ahousaht) texts with grammatical analysis (Endangered Languages of the Pacific Rim A2-027). Nakanishi Printing.</p>

* <p id=Nakayama2003b>Nakayama, Toshihide. 2003. George Louie's Nuu-chah-nulth (Ahousaht) texts with grammatical analysis (Endangered Languages of the Pacific Rim A2-028). Nakanishi Printing.</p>

([back to top](#readme))

## 10. Legal

[My dissertation][dissertation] is copyrighted to me, and made available for public use under a [CC-BY-ND 4.0 license][CCBYND]. Please feel free to copy and redistribute my thesis, but not to modify it.

The English data in this repository come from the [Open American National Corpus][OANC], and made be freely used without restriction.

The Nuuchahnulth data in this repository are copyright to Caroline Little and George Louie, and may not be modified or reproduced without first consulting [Toshihide Nakayama][Toshi], editor of the corpus.

The scripts in this repository are made freely available under an [MIT license][MIT].

Please contact me, [Daniel W. Hieber](https://danielhieber.com), if you have any other questions about using materials in this repository.

<!-- Links -->
[ANC-Tool]:         http://www.anc.org/software/anc-tool/
[CCBYND]:           https://creativecommons.org/licenses/by-nd/4.0/
[Charlotte]:        https://newsouthvoices.uncc.edu
[cloning]:          https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository
[DaFoDiL]:          https://format.digitallinguistics.io/
[dissertation]:     https://files.danielhieber.com/publications/dissertation.pdf
[dlx-concordance]:  https://github.com/digitallinguistics/concordance/
[GitHub]:           https://github.com/dwhieb/dissertation
[Java]:             https://www.java.com
[JSON]:             http://json.org/
[KWIC]:             https://en.wikipedia.org/wiki/Key_Word_in_Context
[Lotus]:            https://app.digitallinguistics.io/
[MIT]:              https://choosealicense.com/licenses/mit/
[Node]:             https://nodejs.org/
[npm]:              https://www.npmjs.com/
[Nuuchahnulth]:     https://github.com/dwhieb/Nuuchahnulth
[OANC]:             http://www.anc.org/
[OANC-download]:    http://www.anc.org/data/oanc/download/
[R]:                https://www.r-project.org/
[scription]:        https://scription.digitallinguistics.io/
[Switchboard]:      https://catalog.ldc.upenn.edu/LDC97S62
[tags2dlx]:         https://github.com/digitallinguistics/tags2dlx
[Toshi]:            http://www.aa.tufs.ac.jp/en/staff/list1/nakayamat
