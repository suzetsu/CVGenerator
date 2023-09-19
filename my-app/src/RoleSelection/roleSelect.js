
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./table.css";

const TableComponent = () => {
  
  const [apiData, setApiData] = useState([]); // Store the API response
  const [operationsData, setOperationsData] = useState([]);
  // const [selectedCheckboxes, setSelectedCheckboxes] = useState(
  //   new Array(6).fill(false).map(() => new Array(9).fill())
  // );
  // const rowLabels = [
  //   "Name",
  //   "Update",
  //   "Delete",
  //   "Approve",
  //   "Create",
  //   "view",
  //   "sujan",
  //  "update",
  //  "print",
  //  "hi"
   
  // ]
  // Fetch data from the API and populate apiData
  
    // fetch("https://192.168.1.72:7270/api/MenuItems")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setApiData(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching API data: ", error);
    //   });
    const getData = async  () => {
      try {
      const response = await axios.get("https://192.168.1.72:7270/api/MenuItems");
      // const data = await response.json();
      // console.log(response.data);
      const DataFromApiData = response.data;
      console.log(DataFromApiData);
      setApiData(DataFromApiData);
      // const {action} = response.data;
      // setOperationsData(extractedOperations);
      // console.log(action);
      } catch (error) {
        console.error("Error fetching API data: ",error);
      }
    }
    useEffect(() => {
      getData();
  }, []);
  
  // Initialize an array to store action values
const actions = [];

// Iterate through the API data to collect action values
apiData.forEach((menuItem) => {
  if (Array.isArray(menuItem.$values)) {
    menuItem.$values.forEach((operation) => {
      if (operation.action) {
        actions.push(operation.action);
      }
    });
  }
});

console.log(actions);
  // Generate rowLabels based on the operations in apiData
  const [rowLabels, setRowLabels] = useState([]);
  useEffect(() => {
    if (apiData.length > 0) {
      const operationNames = Array.from(
        new Set(apiData.flatMap((item) => Object.keys(item.operations)))
      );
      const updatedRowLabels = ["Name", ...operationNames];
      setRowLabels(updatedRowLabels);
      // setSelectedCheckboxes(new Array(6).fill(false).map(() => new Array(updatedRowLabels.length).fill(false)));
    }
  }, [apiData]);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    new Array(7).fill(false).map(() => new Array(rowLabels.length).fill(false))
  );
  const secondColumnLabels = [
    "Home",
    "Details",
    "category",
    "Template",
    "UserMng",
    "Role",
    "hello"
    
  ];
  // const initialRowCount = secondColumnLabels.length;
  // const initialColumnCount = rowLabels.length + 1;


  // useEffect(() => {
  //   // Update selectedCheckboxes based on row and column count
  //   setSelectedCheckboxes((prevSelectedCheckboxes) => {
  //     const newSelectedCheckboxes = [...prevSelectedCheckboxes];

  //     // Add new rows if needed
      
  //     while ( initialColumnCount > newSelectedCheckboxes.length) {
  //       newSelectedCheckboxes.push(new Array(initialColumnCount+1).fill(false));
  //     }

  //     // Remove extra rows if needed
  //     while (newSelectedCheckboxes.length > initialRowCount) {
  //       newSelectedCheckboxes.pop();
  //     }

  //     // Add new columns if needed
  //     for (let i = 0; i < newSelectedCheckboxes.length; i++) {
  //       while (newSelectedCheckboxes[i].length < initialColumnCount.length) {
  //         newSelectedCheckboxes[i].push(false);
  //       }
  //     }

  //     // Remove extra columns if needed
  //     for (let i = 0; i < newSelectedCheckboxes.length; i++) {
  //       while (newSelectedCheckboxes[i].length > initialColumnCount + 1) {
  //         newSelectedCheckboxes[i].pop();
  //       }
  //     }

  //     return newSelectedCheckboxes;
  //   });
  // }, [initialRowCount, initialColumnCount]);

  // Function to handle checkbox click
  const handleCheckboxClick = (rowIndex, colIndex) => {
    const updatedCheckboxes = [...selectedCheckboxes];
    // if (colIndex === 0 && rowIndex === 0) {
    //   // If the clicked checkbox is the "SN" checkbox, toggle all other checkboxes
    //   const isSNChecked = selectedCheckboxes[0][0];
    //   for (let i = 0; i < updatedCheckboxes.length; i++) {
    //     updatedCheckboxes[i][colIndex] = !isSNChecked;
    //     updatedCheckboxes[i][colIndex+2] = !isSNChecked;
    //     updatedCheckboxes[i][colIndex+3] = !isSNChecked;
    //     updatedCheckboxes[i][colIndex+4] = !isSNChecked;
    //     updatedCheckboxes[i][colIndex+5] = !isSNChecked;
    //     updatedCheckboxes[i][colIndex+6] = !isSNChecked;
    //   }
    // } 
    // else 
    if (colIndex === 0) {
      // If the clicked checkbox is in the leftmost column,
      // toggle all checkboxes in the same row
      updatedCheckboxes[rowIndex] = updatedCheckboxes[rowIndex].map(() => {
        return !selectedCheckboxes[rowIndex][0];
      });
    } else {
      // Toggle the clicked checkbox
      updatedCheckboxes[rowIndex][colIndex] = !selectedCheckboxes[rowIndex][colIndex];
    }
  
    // setSelectedCheckboxes(updatedCheckboxes);
    setSelectedCheckboxes(updatedCheckboxes);
    // updatedCheckboxes[rowIndex][colIndex] = !selectedCheckboxes[rowIndex][colIndex];
    // setSelectedCheckboxes(updatedCheckboxes);

    // Get the operation ID based on the colIndex (adjust for rowLabels)
    const operationID = operationsData[colIndex - rowLabels.length].operationID;

    // Make an API request to perform the action for the selected operation
    // Replace the following line with your actual API request logic
    fetch(`https://your-api-url-here/perform-action/${operationID}`, {
      method: "POST",
      body: JSON.stringify({
        isChecked: updatedCheckboxes[rowIndex][colIndex],
        
      }),
      Headers: {
        "Content-Type": "application/json",
      }
      // Add any required headers and request data here
      
      // Add any required headers and request data here
    })
      .then((response) => {
        if (response.ok) {
          // Operation was successful, update the state or provide feedback
          // You can update the selectedCheckboxes state if needed
        } else {
          // Handle error if the operation fails
          console.error("Failed to perform operation");
        }
      })
      .catch((error) => {
        console.error("Error performing operation:", error);
      });
    
  };
  

  // Generate checkboxes for a row
  const generateCheckboxesForRow = (rowIndex) => {
    return selectedCheckboxes[rowIndex].map((isChecked, colIndex) => {
      if (colIndex === 1) {
        // Display text in the second column
        return (
          <div key={colIndex} className="flex items-center " style={{ minWidth: "80px" }}>
            {secondColumnLabels[rowIndex]}
          </div>
        );
      } else {
        // Display checkboxes
        return (
          <input
            key={colIndex}
            type="checkbox"
            checked={isChecked}
            // checked={selectedCheckboxes[rowIndex][colIndex]}
            onChange={() => handleCheckboxClick(rowIndex, colIndex)}
          />
        );
      }
    });
  };
  // Generate rows with checkboxes
  const generateRowsWithCheckboxes = () => {
    return selectedCheckboxes.map((row, rowIndex) => (
      <div key={rowIndex} className="flex gap-[75px] pb-6 text-sm items-center">
        {generateCheckboxesForRow(rowIndex)}
      </div>
    ));
  };


  return (
    <div className="flex justify-center items-center pt-0 font-bold bg-[#c4c4c4] h-[100vh]">
      <div className="card7">
        <div className="flex  justify-center">
          <div className="pl-4 pt-8">
            <div>
              <div className="pb-4 font-helvetica font-bold text-xl text-blue-700">
                Select Role
              </div>
              <div className="flex flex-col pt-4">
              <div className="flex gap-14 text-sm bg-[#B4DBFA]  font-helvetica pt-4 pb-4">
              <div className="pl-1">Select:</div>
              
                  {rowLabels.map((label, colIndex) => (
                    <div key={colIndex} className="flex items-center">
                      {label}
                    </div>
                  ))}
                
                </div>
                {/* <div className="flex gap-14 text-sm bg-[#B4DBFA]  font-helvetica pt-4 pb-4">
                  
                  <div className="pl-1">Select:</div>
                  <div>
                    <input
                      type="checkbox"
                      placeholder=""
                      checked={selectedCheckboxes[0][0]}
                      onChange={() => handleCheckboxClick(0, 0)}
                    />
                  </div>
                  
                  <div>Name</div>
                  <div className="pl-8">Update</div>
                  <div>Read</div>
                  <div>Delete</div>
                  <div>Approve</div>
                  <div className="mr-2">Create</div>
                </div> */}
                {/* {generateRowsWithoutCheckboxes()} */}
              </div>
              <hr></hr>
              {generateRowsWithCheckboxes()}
              <div >
                <button className="bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
