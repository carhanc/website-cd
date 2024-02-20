const jobs = [
  {
    "title": "Data Analyst",
    "pay": "$60,000 - $80,000",
    "skills": ["SQL", "Python", "Tableau", "Statistical Analysis"],
    "desc": "Responsible for interpreting data, analyzing results using statistical techniques, and providing ongoing reports.",
    "type": "Full Time",
    "edu": "Bachelor's degree in Mathematics, Economics, Computer Science, Information Management, or Statistics",
    "responsibilities": [
      "Develop and implement databases, data collection systems, data analytics, and other strategies that optimize statistical efficiency and quality. ",
      "Acquire data from primary or secondary data sources and maintain databases/data analysis systems. ",
      "Interpret data, analyze results using statistical techniques, and provide ongoing reports. "
    ],
    "qualifications": [
      "Proven working experience as a Data Analyst or Business Data Analyst. ",
      "Technical expertise regarding data models, database design development, data mining, and segmentation techniques. ",
      "Strong knowledge of and experience with reporting packages (Business Objects etc), databases (SQL etc), programming (XML, JavaScript, or ETL frameworks). ",
      "Knowledge of statistics and experience using statistical packages for analyzing datasets (Excel, SPSS, SAS etc). "
    ],
    "benefits": "Health insurance, 401(k), paid time off, remote work options",
    "location": "Hybrid",
    "experience": "Mid"
  },
  {
    "title": "Research Scientist",
    "pay": "$80,000 - $120,000",
    "skills": ["Machine Learning", "Statistical Modeling", "Python", "R"],
    "desc": "Conducts complex quantitative analyses and models development to support decision-making by running simulations or analyses.",
    "type": "Full Time",
    "edu": "Ph.D. in Computer Science, Mathematics, Physics, or a related field",
    "responsibilities": [
      "Develop new algorithms and models to analyze large datasets. ",
      "Collaborate with product and engineering teams to design and implement software solutions for data analysis. ",
      "Publish research findings in peer-reviewed journals and conferences. "
    ],
    "qualifications": [
      "Proven experience as a Research Scientist or similar role, with a focus on machine learning or statistical modeling. ",
      "Strong programming skills (Python, R). ",
      "Experience in developing and implementing machine learning algorithms and statistical models. "
    ],
    "benefits": "Health insurance, 401(k) matching, equity options, flexible schedule",
    "location": "Remote",
    "experience": "Senior"
  },
  {
    "title": "Business Intelligence Analyst",
    "pay": "$70,000 - $90,000",
    "skills": ["Data Warehousing", "BI tools (Power BI, Tableau)", "SQL", "Data Modeling"],
    "desc": "Responsible for transforming data into insights that drive business value. This involves analyzing data, generating reports, and creating dashboards.",
    "type": "Full Time",
    "edu": "Bachelor's degree in Information Technology, Computer Science, or related field",
    "responsibilities": [
      "Translate business needs to technical specifications. ",
      "Design, build and deploy BI solutions (e.g., reporting tools). ",
      "Maintain and support data analytics platforms. "
    ],
    "qualifications": [ 
      "Experience with BI technologies (Microsoft Power BI, Oracle BI). ",
      "Knowledge of SQL queries, SQL Server Reporting Services (SSRS) and SQL Server Integration Services (SSIS). ",
      "Proven abilities to take initiative and be innovative. "
    ],
    "benefits": "Remote work options, health insurance, professional development allowances",
    "location": "Hybrid",
    "experience": "Mid"
  },
  {
    "title": "Data Engineer",
    "pay": "$90,000 - $110,000",
    "skills": ["Big Data Technologies", "ETL Processes", "Python", "Cloud Services (AWS, Google Cloud)"],
    "desc": "Builds and maintains the organization's data pipeline systems and is responsible for the extraction, transformation, and loading of data from a wide variety of data sources.",
    "type": "Full Time",
    "edu": "Bachelor's degree in Computer Science, Engineering, or a related field",
    "responsibilities": [
      "Assemble large, complex data sets that meet functional / non-functional business requirements. ",
      "Identify, design, and implement internal process improvements: automating manual processes, optimizing data delivery, re-designing infrastructure for greater scalability, etc. ",
      "Build the infrastructure required for optimal extraction, transformation, and loading of data from a wide variety of data sources using SQL and AWS ‘big data’ technologies. "
    ],
    "qualifications": [
      "Experience with big data tools: Hadoop, Spark, Kafka, etc. ",
      "Experience with data pipeline and workflow management tools: Azkaban, Luigi, Airflow, etc. ",
      "Experience with AWS cloud services: EC2, EMR, RDS, Redshift. "
    ],
    "benefits": "Stock options, flexible hours, remote work options, wellness programs",
    "location": "Remote",
    "experience": "Mid"
  },
  {
    "title": "Analytics Manager",
    "pay": "$100,000 - $130,000",
    "skills": ["Leadership", "Project Management", "Data Visualization", "Statistical Analysis"],
    "desc": "Leads the analytics department, overseeing data analysis and strategy implementation. Ensures data accuracy and provides insights for decision making.",
    "type": "Full Time",
    "edu": "Master's degree in Business Analytics, Data Science, or related field",
    "responsibilities": [
      "Manage a team of analysts, data scientists, and data engineers. ",
      "Oversee the design and delivery of reports and insights that analyze business functions and key operations. ",
      "Implement and oversee the tools and platforms for analytics and data visualization. "
    ],
    "qualifications": [
      "Strong leadership skills and experience in managing teams. ",
      "Proven experience in data analysis and management. ",
      "In-depth understanding of database management systems, online analytical processing (OLAP) and ETL (Extract, transform, load) framework. "
    ],
    "benefits": "Comprehensive health insurance, 401(k) with company match, generous vacation policy, remote work flexibility",
    "location": "Hybrid",
    "experience": "Senior"
  },
  {
    "title": "Marketing Data Analyst",
    "pay": "$50,000 - $70,000",
    "skills": ["SEO/SEM", "Google Analytics", "SQL", "Data Visualization"],
    "desc": "Analyzes marketing metrics to identify cause-effect relationships between marketing actions and financial outcomes to increase profitability.",
    "type": "Full Time",
    "edu": "Bachelor's degree in Marketing, Business, Statistics, or related field",
    "responsibilities": [
      "Measure ROI of online and offline advertising campaigns.",
      "Report on marketing KPIs like leads, conversion rates, website traffic and social media engagement.",
      "Track email campaign metrics (delivery, open, click-through rates)."
    ],
    "qualifications": [
      "Proven experience in market analysis.",
      "Familiarity with CRM programs.",
      "Adept at queries, report writing and presenting findings."
    ],
    "benefits": "Remote work options, flexible hours, health insurance, paid time off",
    "location": "Remote",
    "experience": "Entry"
  },
  {
    "title": "Junior Data Scientist",
    "pay": "$55,000 - $75,000",
    "skills": ["Python", "R", "Machine Learning", "Statistical Analysis"],
    "desc": "Supports senior data scientists in processing and analyzing large data sets to identify trends, develop charts, and create models.",
    "type": "Full Time",
    "edu": "Bachelor's degree in Computer Science, Statistics, Applied Math or related field",
    "responsibilities": [
      "Clean and validate data for uniformity and accuracy.",
      "Perform initial analysis to assess the quality of the data.",
      "Perform further analysis to determine the meaning of the data."
    ],
    "qualifications": [
      "Strong problem-solving skills with an emphasis on product development.",
      "Experience using statistical computer languages (R, Python, etc.) to manipulate data and draw insights from large data sets.",
      "Knowledge of a variety of machine learning techniques."
    ],
    "benefits": "Health insurance, paid time off, employee mentoring program, career development courses",
    "location": "Hybrid",
    "experience": "Entry"
  },
  {
    "title": "Data Operations Specialist",
    "pay": "$45,000 - $65,000",
    "skills": ["Data Management", "SQL", "Scripting", "Process Improvement"],
    "desc": "Maintains database performance by identifying and resolving issues, supporting users, and ensuring data integrity.",
    "type": "Full Time",
    "edu": "Associate's degree in Information Technology, Bachelor's preferred",
    "responsibilities": [
      "Monitor databases for proper performance.",
      "Implement data standards, procedures, and guidelines to ensure data integrity.",
      "Assist in database design, development, and maintenance as needed."
    ],
    "qualifications": [
      "Understanding of database structures, theories, principles, and practices.",
      "Working technical experience with designing, building, installing, configuring, and supporting database servers.",
      "Good communication and documentation skills."
    ],
    "benefits": "401(k) plan, health insurance, paid vacation, sick leave, and holidays, employee training programs",
    "location": "In Person",
    "experience": "Entry"
  },
  {
    "title": "Customer Data Analyst",
    "pay": "$60,000 - $80,000",
    "skills": ["CRM", "Data Mining", "SQL", "Customer Segmentation"],
    "desc": "Utilizes data analysis techniques to understand customer behavior, improve customer experience, and drive sales.",
    "type": "Full Time",
    "edu": "Bachelor's degree in Marketing, Business, Statistics, or related field",
    "responsibilities": [
      "Analyze customer data to identify trends and insights.",
      "Collaborate with the marketing team to develop targeted marketing strategies.",
      "Prepare reports and dashboards to present findings to management."
    ],
    "qualifications": [
      "Experience with CRM software and database systems.",
      "Strong analytical skills with a goal-oriented attitude.",
      "Proven ability to work collaboratively in a team environment."
    ],
    "benefits": "Competitive salary, comprehensive health benefits, 401(k) with match, generous PTO",
    "location": "Hybrid",
    "experience": "Mid"
  },
  {
    "title": "Product Data Manager",
    "pay": "$75,000 - $95,000",
    "skills": ["Product Management", "Data Analysis", "Project Coordination", "Cross-functional Team Leadership"],
    "desc": "Oversees the data associated with the company's products, ensuring accuracy and accessibility to stakeholders.",
    "type": "Full Time",
    "edu": "Bachelor's degree in Business Administration, Data Management, Product Management, or related field",
    "responsibilities": [
      "Manage and improve product data management processes.",
      "Coordinate with IT, sales, and marketing teams to ensure product data integrity and consistency.",
      "Develop strategies to optimize product data for e-commerce platforms."
    ],
    "qualifications": [
      "Strong understanding of product data management and information systems.",
      "Proven experience in managing cross-functional teams and projects.",
      "Excellent communication and leadership skills."
    ],
    "benefits": "Flexible working conditions, health and wellness programs, professional development opportunities, team building events",
    "location": "Hybrid",
    "experience": "Mid"
  },
]

export default jobs;
