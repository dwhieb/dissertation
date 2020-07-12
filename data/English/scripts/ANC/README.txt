ANC GrAF Tool
Copyright 2006-2011 American National Corpus

The ANC GrAF Tool is a simple Java program that can convert standoff
annotations files in the XCES or GrAF/XML format into other formats.

The ANC GrAF Tool is able to process files from the ANC 2nd release, 
Open ANC (OANC), and the OANC in GrAF/XML format. The current version 
of the ANC GrAF Tool is not able to process the files in the MASC corpus 
at this time.


PREREQUISITES

The ANC GrAF Tool requires Java 1.6 or later. The latest Java version 
can be downloaded from http://www.java.com/getjava


RUNNING

The ANCTool is distributed as an executable Jar file which means users can
start the program by double clicking on the jar file. However it is strongly
recommended that users start the command line with the command

java -Xmx500M -jar ANCTool-x.y.z-jar.jar

This increases the amount of memory available to the ANC GrAF Tool and 
prevents out of memory errors that can occur when processing large files in 
the Open ANC.


USAGE

The first time you run the ANC GrAF Tool you will be asked for the 
location of the ANC data files. You can change this later by selected
"Select corpus" in the File menu. This is where the corpus header is
expected to be located. The files to be processed by the tool do not
need to be a child of this folder, it is only used to find the corpus
header.

Select the input directory, that is, the directory containing the files
to be processed. You may process the entire corpus at once or just the 
directory containing the files you are interested in. To have the tool
process a single file copy the desired file into an empty directory and
select that as the input directory in the tool.

The output directory is where the output files will be created. If the 
"Copy directory structure" check box is selected all sub-folders of the
selected input directory will be created. If the "Copy directory structure"
is not selected all generated files will be placed in the selected output
directory.

The type of annotations available will depend on the output format 
selected.


UNINSTALLATION

Delete the ANCTool executable (.app, .exe., or .jar depending on what you 
installed) as well as the ANCTool.properties and ANCTool.log files if
they exist.
