#!/bin/bash
temp_in_file=$(mktemp) 
temp_out_dir=$(mktemp -d)
cat > ${temp_in_file} 
pdflatex -output-directory=$temp_out_dir -jobname=output $temp_in_file
cat $temp_out_dir/*.pdf
rm -r ${temp_out_dir}
rm ${temp_in_file}