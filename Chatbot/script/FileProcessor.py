import fitz  # PyMuPDF



class FileProcessor:
    def __init__(self, ):
        pass

    def parse(self,path):
        text = ""
        with fitz.open(path) as doc:
            for page in doc:
                text += page.get_text("text") + "\n"
        return text



