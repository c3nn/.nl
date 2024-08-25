import os

def listFilesInFolder(folder_path):
    files = []
    for entry in os.scandir(folder_path):
        if entry.is_file():
            files.append(entry.name)
    return files

templateHtml = open("blank.templateHtml", "r").read()
srcFolderPath = "src"

for file in listFilesInFolder(srcFolderPath):
	pageName = file.replace('.html',"")
	srcFile = open(srcFolderPath + "/" + file)
	temp = templateHtml
	temp = temp.replace("c3[content]", srcFile.read())
	if file == "index.html":
		temp = temp.replace("c3[title]", "")
	else:
		temp = temp.replace("c3[title]", "/ " + pageName)
	temp = temp.replace('c3[pageName]', pageName)

	newFile = open(file, "w")
	newFile.write(temp)
	srcFile.close()
	newFile.close()
