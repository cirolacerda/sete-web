class FilesHelper {
    public downloadBlob(blob: Blob) {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "alunos";
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        a.remove();
    }

    public async delay(num: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, num);
        });
    }
}

const filesHelper = new FilesHelper();
export { filesHelper, FilesHelper };
