# **Project Idea and Workflow for Grey Literature Search Engine**

### **Objective**

To facilitate a **systematic grey literature search** that aligns with **PRISMA 2020 guidelines** for non-traditional database searches, particularly in locating **clinical guidelines** based on the **PIC framework (Population, Interest, Context, Study Design)**.

### **User**

## The end user is Public Health Researchers who support guideline developer groups (GDGs). They need to systemtically search and appraise existing guidelines and other grey literature to support the development of new guidelines. They do this according to PRISMA 2020 guidelines.

## **1. First Webpage: Login & Authentication**

**Purpose:** To allow users to securely log in and manage their grey literature searches.

- **User authentication options:**
  - Login with an existing account
  - Create a new account
  - Password recovery/reset feature
- **Security features:**
  - Multi-factor authentication (if required)
  - Secure session management

After successful authentication, users proceed to their **dashboard**.

---

## **2. Second Webpage: User Dashboard**

**Purpose:** Provides users with options to **start a new search** or **review past searches**.

- **Options available:**
  - **Start a New Search:** Redirects users to the **New Search Window**.
  - **View Past Searches:** Displays a list of previous searches with:
    - Search title
    - Date of execution
    - Summary of findings
    - Status (Completed, In Progress, or Draft)
    - Option to reopen/edit a saved search

Users can click on any past search to **view, refine, or export results**.

---

## **3. Third Webpage: New Search Window**

**Purpose:** Allows users to define their search parameters using the **PIC framework** and configure the search execution settings.

1. **PIC Framework Inputs:**

   - **Population** (e.g., pediatrics, elderly, specific conditions)
   - **Interest** (e.g., diabetes management, hypertension, oncology)
   - **Context** (e.g., primary care, hospital setting, rural healthcare)

2. **API Selection:**

   - Users choose which **SERP APIs** to query:
     - **SERP API**
     - **SERPER API**
     - **DuckDuckGo API**
   - The system can **manage multiple SERP calls** and handle **rate-limiting** using LangChain’s built-in API management utilities, as needed.

3. **User-Provided Targeted URLs:**

   - Users may input **specific URLs** for targeted searches.
   - These URLs will be used in **Boolean search strings** constructed later in the **Search Strategy Agent Page**.

4. **Upload Examples of Already Identified Guidelines:**

   - Users can upload PDFs, Word docs, or other relevant files.
   - The system utilizes **LangChain’s advanced document loaders** to ingest these documents.
   - **Text splitting** and **embedding** modules from LangChain are used to chunk large documents and store them in a **vector database**.

5. **Submit & Proceed:**
   - Upon submission, the user moves to the **Search Strategy Agent Page**.

---

## **4. Fourth Webpage: Search Strategy Agent Page**

**Purpose:** To refine the search strategy using an **AI-driven planning agent** that collaborates with the user.

### **A. Processing Uploaded Guidelines & User Inputs**

- **Parsing & Extraction:**
  - Uploaded guidelines are parsed for **key entities, topics, and relationships** using LangChain’s **structured information extraction** tools.
  - Extracted data is embedded in a **vector database** and optionally stored in a **graph database** (e.g., Neo4j) to form or update a **Knowledge Graph**.

### **B. Search Strategy Refinement with AI**

- The system uses a **DeepSeek R1-based planning agent** (or equivalent) orchestrated via LangChain to:
  - Suggest **relevant keywords, synonyms, and Boolean operators** based on PIC inputs and the embedded guidelines.
  - Leverage LangChain’s LLM integration (through OpenRouter API) to produce refined search terms.
- Users can **approve, modify, or refine** these suggested terms.
- Once finalized, the agent constructs **Boolean search strings** for each PIC concept and for **user-provided targeted URLs**.

---

## **5. Fifth Webpage: Search Execution & Results Presentation**

**Purpose:** Executes searches across selected APIs, ranks results, and presents an **interactive results table**.

### **A. Execution of Searches**

- Boolean search strings are run across **SERP API, SERPER API,** and/or **DuckDuckGo API**.
- LangChain can coordinate these API calls, **handling rate-limits** and managing parallel requests.
- Results (webpage titles, metadata, and snippets) are retrieved.

### **B. Processing and Storage**

- **Deduplication:** Identical results from multiple APIs are removed.
- **Parsing & Ranking:**
  - Retrieved data is parsed for **metadata, snippets, and relevance**.
  - Data is stored in the **vector database**.
  - The system compares results against **PIC criteria** and **uploaded guidelines** (now embedded via LangChain’s pipelines) to produce a relevance ranking.
- **Automatic Document Download & Processing:**
  - If a result links to a PDF/Word doc, it is downloaded and processed using **LangChain’s document loaders** and embedded for ranking consistency.

### **C. Interactive Search Results Table**

| **Title** (clickable link) | **Snippet** (API or LLM summary) | **Source** | **User Actions**                          |
| -------------------------- | -------------------------------- | ---------- | ----------------------------------------- |
| **Hyperlinked Title**      | **Short snippet**                | **Domain** | **Include/Exclude/Maybe + Justification** |

- Users can:
  - **View** original webpages/documents in a new tab.
  - Classify each result as **Included**, **Excluded**, or **Maybe**, providing **justification** as needed.

---

## **6. Sixth Webpage: Final Results & Reporting**

**Purpose:** To provide an overview of search findings and generate a **PRISMA 2020-compliant report**.

### **A. Categorized Search Results**

- Three lists show:
  1. **Included Webpages & Documents**
  2. **Maybe Webpages & Documents**
  3. **Excluded Webpages & Documents**

### **B. Summary Statistics**

- A breakdown of the search process, including:
  - **Number of initial results per API**
  - **Number of duplicates removed**
  - **Number of unique results reviewed**
  - **Document types** (PDFs, Word docs, HTML pages, etc.)
  - **Final counts** for Included, Maybe, Excluded

### **C. PRISMA-Compliant Report**

- The system auto-generates a **PRISMA 2020-compliant** flowchart and summary, including:
  - Search strategy details
  - API sources
  - Inclusion/exclusion rationale
- **Export Options:** Users can download the report as **PDF** or store it within the system.

---

## **Key Benefits of the Workflow**

1. **Systematic and Comprehensive:** Incorporates **PIC** and **Study Design** criteria to ensure thorough coverage of grey literature.
2. **LangChain-Driven Enhancements:**
   - **Document Processing:** Advanced document loaders, text splitting, and embeddings.
   - **Knowledge Graph Construction:** Structured information extraction to enhance retrieval.
   - **API Management:** Handles multiple SERP calls with rate-limiting compliance.
   - **Semantic Search:** Uses vector embeddings for more accurate, context-based results.
   - **AI Workflow Orchestration:** Automates complex tasks like keyword suggestion, result ranking, and PRISMA reporting.
3. **PRISMA-Compliant:** Follows modern best practices for transparent and replicable literature searches.
