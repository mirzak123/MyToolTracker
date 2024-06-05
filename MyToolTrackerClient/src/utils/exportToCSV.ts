import { Parser } from "json2csv";

const exportToCSV = (data: any, fileName: string) => {
  if (data.length === 0) {
    return;
  }

  const parser = new Parser();
  const csv = parser.parse(data);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportToCSV;
