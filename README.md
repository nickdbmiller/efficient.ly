# **_efficient.ly_**

## Overview

**_efficient.ly_** is a [React](https://reactjs.org/) application that enables users to make informed decisions about energy and resource usage in their homes. The site contains a plethora of information on ways to make their homes more efficient and therefore, save money and protect the environment.

## Wireframes
#### Homepage
![Homepage for efficient.ly]()

###### [Wireframes created with Figma](https://www.figma.com/)

## Component Hierarchy
![Component hierarchy for efficient.ly]()
###### [Component hierarchy created with Figma](https://www.figma.com/)

## API and Data Sample

This project uses [Airtable](https://www.airtable.com/) as an API. The response data from Airtable returns an object with data specifying insulation and heating energy data for a house in a given U.S. climate zone:

```
{
    "id": "recuxb0JIB5JHgLcf",
    "fields": {
        "climateZone": 6,
        "wallThickness": 12,
        "wallRValue": 28,
        "btuPerHr": 9000,
        "sqrFeet": 1500
    },
    "createdTime": "2022-01-08T01:10:17.000Z"
}
```
###### Uses [React Router](https://reactrouter.com/docs/en/v6) routes and [Axios](https://axios-http.com/docs/intro) for API requests.

## MVP/PostMVP
#### MVP
- Use [Airtable](https://www.airtable.com/) base as API
- Contains pages on electrical, heating, cooling, water, and ventilation as they pertain to green building design
- Renders heating data to page, and based on user input sizes heating load requirements and saves to database 
- Use [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) styling and responsive design on different two different screen sizes
- Displays header with title of site, navbar, and footer with links to gitHub and [LinkedIn](www.linkedin.com/in/ndbmiller)

#### PostMVP
- Utilize GIS data from [ESRI](https://developers.arcgis.com/javascript/latest/) to make clickable map for climate zone data
- Ventilation sizing tool
- Use database to save water and energy use data
- Electrical load tool
- Save various categories of data to different "houses" that will be displayed as interactive list
- Interactive graphs displaying cost savings based on local utility data

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|

## Priority Matrix

![Priority Matrix for Development of efficient.ly]()
###### [Priority matrix created with Figma](https://www.figma.com/) 

## Timeframes

| Component | Priority  | Estimated Time    | Curently Invested | Actual Time   |
| ---       | :---:     |  :---:            | :---:         | :---:         |
| Total     |           | 40hrs             | Xhrs          | Xhrs        |

## Code Snippet

## [Change Log](https://github.com/nickdbmiller/efficient.ly/commits/main)
