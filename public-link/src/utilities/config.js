import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export const myConfig = { apiUrl: 'http://194.87.199.12:5000' };
// export const myConfig = { apiUrl: 'http://localhost:8000/api' };
export const myPut = async (url, body, header) => {
  try {
    const response = await axios.put(
      `${myConfig.apiUrl}/${url}`,
      body,
      {
        headers:header, //here I want to pass Bearer Token
      }
    );
    // console.log("ShowData: ", response.data[0]);
    console.log("Put data: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export const myGet = async (url, header) =>{
  try {
    const response = await axios.get(
      `${myConfig.apiUrl}/${url}`,
      {
        headers:header, //here I want to pass Bearer Token
      }
    );
    // console.log("ShowData: ", response.data[0]);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const myDelete = async (url, header) =>{
  try {
    const response = await axios.delete(
      `${myConfig.apiUrl}/${url}`,
      {
        headers:header, //here I want to pass Bearer Token
      }
    );
    // console.log("ShowData: ", response.data[0]);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getDatafromDatabase = async (value) =>{
  try {
    const response = await axios.get(
      `${myConfig.apiUrl}/social/private/contactdata?is_pending=${value}`,
      {
        headers:{Authorization: `token ${localStorage.getItem('token')}`}, //here I want to pass Bearer Token
      }
    );
    // console.log("ShowData: ", response.data[0]);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const convertTextDataToHTML = (data) => {
  let align = "left"; // Default alignment if not specified
  data.forEach((item) => {
    if (item.attributes && item.attributes.align) {
      align = item.attributes.align;
    }
  });

  let htmlText = `<div style="text-align: ${align}">`;
  data.forEach((item) => {
    let html = item.insert;
    if (item.attributes) {
      if (item.attributes.bold) {
        html = `<strong>${html}</strong>`;
      }
      if (item.attributes.italic) {
        html = `<em>${html}</em>`;
      }
      if (item.attributes.underline) {
        html = `<u>${html}</u>`;
      }
      if (item.attributes.color) {
        html = `<span style="color: #${item.attributes.color.slice(3)}">${html}</span>`;
      }
      if (item.attributes.background) {
        html = `<span style="background-color: #${item.attributes.background.slice(3)}">${html}</span>`;
      }
      if (item.attributes.size === "huge") {
        html = `<span style="font-size: 2em">${html}</span>`;
      }
      if (item.attributes.size === "large") {
        html = `<span style="font-size: 1.5em">${html}</span>`;
      }
      if (item.attributes.size === "normal") {
        html = `<span style="font-size: 1em">${html}</span>`;
      }
      if (item.attributes.size === "small") {
        html = `<span style="font-size: 0.8em">${html}</span>`;
      }
      if (item.attributes.font) {
        html = `<span style="font-family: ${item.attributes.font}">${html}</span>`;
      }

      // Handle other attributes as needed
    }
    htmlText += html;
  });
  htmlText += '</div>';
  console.log(htmlText);
  return htmlText;
};

export const RenderFormattedText = ({textData}) => {
  const htmlText = convertTextDataToHTML(textData);

  return (
    <ReactQuill
      value={htmlText}
      readOnly={true}
      theme="snow"
    />
  );
};
