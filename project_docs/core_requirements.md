# Core Requirements for Grey Literature Search Engine

## Overview

- The system shall be built using a microservice architecture
- The system shall serve Public Health Researchers supporting guideline developer groups (GDGs)
- The system shall comply with PRISMA 2020 guidelines for systematic reviews
- The system shall use Docker containers for service deployment and management

## Containerization Requirements

### Container Architecture

- **REQ-CONT-ARCH-1:** Each microservice shall be deployed as a separate Docker container following the Single Responsibility Principle
- **REQ-CONT-ARCH-2:** Services shall use minimal base images to optimize performance and reduce security vulnerabilities
- **REQ-CONT-ARCH-3:** Service configuration shall be managed through environment variables for deployment flexibility

### Data Management

- **REQ-CONT-DATA-1:** Persistent data shall be managed using Docker volumes
- **REQ-CONT-DATA-2:** MongoDB and Neo4j databases shall be containerized with appropriate volume mounts
- **REQ-CONT-DATA-3:** Vector database shall be containerized with appropriate volume mounts

### Networking

- **REQ-CONT-NET-1:** Services shall communicate through Docker networks configured for security
- **REQ-CONT-NET-2:** The API Gateway shall manage external access to the service network
- **REQ-CONT-NET-3:** Internal service communication shall be restricted to necessary service-to-service connections

### Monitoring and Logging

- **REQ-CONT-MON-1:** Each container shall implement health checks
- **REQ-CONT-MON-2:** The system shall use centralized logging for container logs
- **REQ-CONT-MON-3:** Container metrics shall be collected for performance monitoring

## Functional Requirements

### User Authentication and Management

- **REQ-FR-AUTH-1:** The system shall allow users to log in using existing account credentials.
- **REQ-FR-AUTH-2:** The system shall provide an option for users to create a new account.
- **REQ-FR-AUTH-3:** The system shall offer a password recovery or reset feature for users.
- **REQ-FR-AUTH-4:** The system shall implement an API Gateway to manage authentication and requests across microservices

### User Dashboard

- **REQ-FR-DASH-1:** The dashboard shall provide an option to start a new search, redirecting users to the New Search Window.
- **REQ-FR-DASH-2:** The dashboard shall display a list of previous searches with details including:
  - Search title
  - Date of execution
  - Summary of findings
  - Status (Completed, In Progress, or Draft)
  - Option to reopen or edit a saved search

### New Search Configuration

- **REQ-FR-SEARCH-1:** The system shall provide input fields for users to define search concepts using the PIC framework, including:
  - Population
  - Interest
  - Context
- **REQ-FR-SEARCH-2:** The system shall allow users to upload examples of already identified clinical guidelines (e.g., PDFs, Word documents). LangChain's advanced document loaders shall be used to ingest and process these documents.
- **REQ-FR-SEARCH-3:** The system shall allow users to select which SERP APIs to query, including:
  - SERP API
  - SERPER API
  - DuckDuckGo API
  - Google API  
    The system shall manage multiple API calls and handle rate limiting as needed, leveraging LangChain's capabilities for API management where appropriate.
- **REQ-FR-SEARCH-4:** The system shall enable users to input specific URLs for targeted SERP API searches and input the maximum number of results to be returned for each URL provided.
- **REQ-FR-SEARCH-5:** Upon submission of search concepts, the system shall proceed to the Search Strategy Agent Page.

### Search Strategy Agent

- **REQ-FR-AGENT-1:** The system shall parse uploaded guidelines for key entities, topics, and relations, utilizing LangChain's structured information extraction capabilities.

- **REQ-FR-AGENT-2:** The system shall embed parsed data into a vector database using LangChain's text splitting and embedding modules, and integrate it into a Knowledge Graph.

- **REQ-FR-AGENT-3:** the Knowledge Graph is stored in a graph database Neo4j, in line with LangChain's graph integration approaches. The Knowledge Graph shall:

  - Store extracted keywords and their relationships
  - Track keyword frequency within guidelines
  - Identify high-specificity keywords unique to the guidelines
  - Enable keyword discovery through relationship analysis

- **REQ-FR-AGENT-4:** The system shall utilize a large language model (LLM) via OpenRouter API coordinated through LangChain's AI workflow orchestration to suggest relevant keywords, synonyms, and Boolean operators based on user inputted concepts and parsed data. For each concept, the LLM shall generate:

  - Direct synonyms
  - Alternative phrasings
  - Common abbreviations
  - Related terminology

- **REQ-FR-AGENT-5:** The user can chat with the LLM chat to identify additional potentially relevant key words relating to each concept or suggest new additional concepts.

- **REQ-FR-AGENT-6:** The LLM shall query the Knowledge Graph using neo4j cypher language to identify additional keywords by:

  - Locating high-specificity keywords from the uploaded guidelines
  - Finding frequently co-occurring terms
  - Identifying concept-specific terminology

- **REQ-FR-AGENT-7:** The system shall allow users to approve, modify, or refine suggested search terms.

- **REQ-FR-AGENT-8:** The system will then convert these into search strings and shall allow the user to approve, modify, or refine suggested search strings. Each search string must:

  - Contain at least one keyword from each user-defined concept unless the user instructs the LLM otherwise
  - Include the standard guideline concept keywords
  - Use appropriate Boolean operators
  - Include relevant synonyms where applicable
  - Target specific user provided domains when provided

- **REQ-FR-AGENT-9:** Once the search strategy is finalized, the system shall construct multiple Boolean search strings for each PICS concept and targeted URL. The system shall:
  - Include the standard guideline concept "(guideline* OR Recommendation* OR Guidance OR "Consensus Statement")" in every search string
  - Generate base search strings using primary keywords from each concept
  - Create additional strings incorporating LLM-suggested synonyms
  - Produce specialized strings using high-specificity keywords from the Knowledge Graph

Example search strings for diabetes type 2 guidelines for adults in primary care settings:

Base string:

```
(adult*) (diabetes OR "endocrine disease") ("primary care" OR primarycare OR community OR GP OR "general practitioner") (guideline* OR Recommendation* OR Guidance OR "Consensus Statement") site:www.nice.org.uk
```

Synonym-based string:

```
("grown up" OR "over 18") ("type 2 diabetes" OR "T2DM") ("family medicine" OR "general practice") (guideline* OR Recommendation* OR Guidance OR "Consensus Statement") site:www.nice.org.uk
```

High-specificity string (using Knowledge Graph keywords):

```
(adult*) AND ("insulin resistance" OR "metabolic disorder") AND ("community healthcare" OR "primary healthcare setting") AND (guideline* OR Recommendation* OR Guidance OR "Consensus Statement") site:www.nice.org.uk
```

### Search Execution and Results Presentation

- **REQ-FR-EXEC-1:** The system shall execute Boolean search strings across selected SERP APIs and collect responses, including webpage results, metadata, and snippets. Where beneficial, LangChain’s retriever modules may be used to enhance semantic search capabilities.
- **REQ-FR-EXEC-2:** The system shall remove duplicate results retrieved from multiple APIs.
- **REQ-FR-EXEC-3:** The system shall parse retrieved data for metadata, snippets, and relevance, storing it in a vector database for downstream querying and analysis.
- **REQ-FR-EXEC-4:** The system shall compare retrieved data against PIC criteria and uploaded guidelines to determine ranking, leveraging LangChain's embeddings if applicable for contextual matching.
- **REQ-FR-EXEC-5:** If a search result links to a document (e.g., PDF, Word), the system shall automatically download and process it similarly to uploaded guidelines, using LangChain’s advanced document loaders and text splitting for consistent embedding and extraction.
- **REQ-FR-EXEC-6:** The system shall present a ranked list of results (including parsed documents from search result links to a document) in an interactive table with the following columns:
  - Title (clickable link)
  - Snippet (API-provided or LLM-generated summary of parsed document)
  - Source (URL domain and Organization name)
  - Date of publication
  - User Actions (Include / Exclude / Maybe + Justification text box)
- **REQ-FR-EXEC-7:** The system shall allow users to view the original webpage or document in a new tab.
- **REQ-FR-EXEC-8:** The system shall enable users to mark results as Included, Maybe, or Excluded and provide a justification for their decision.
- **REQ-FR-EXEC-9:** The system shall utilize MongoDB for document storage and a vector database for storing embeddings and enabling semantic search capabilities

### Final Results and Reporting

- **REQ-FR-REPORT-1:** The system shall display categorized lists of search results, including:
  - Included Webpages & Documents
  - Maybe Webpages & Documents
  - Excluded Webpages & Documents
- **REQ-FR-REPORT-2:** The system shall provide a detailed breakdown of the search process, including:
  - Number of initial results retrieved per API
  - Number of duplicates removed
  - Number of unique results reviewed (broken down by clicked open by the user when SERP API results or number of unique results retrieved using the webcrawler and processed succesfully)
  - Breakdown of document types (PDFs, Word docs, HTML pages, etc.)
  - Final counts for Included, Maybe, and Excluded results
- **REQ-FR-REPORT-3:** The system shall automatically generate a PRISMA 2020-compliant report in pdf and html formate, including:
  - Search strategy
  - API sources
  - PRISMA completed flowchart (other sources section: [https://www.prisma-statement.org/s/PRISMA_2020_flow_diagram_updated_SRs_v2-dbrh.docx](https://www.prisma-statement.org/s/PRISMA_2020_flow_diagram_updated_SRs_v2-dbrh.docx))
  - results from REQ-FR-REPORT-2
