# Product Requirements Document (PRD) for Grey Literature Search Engine

## 1. Introduction

### 1.1 Purpose

The purpose of this document is to outline the requirements for the development of a Grey Literature Search Engine. This application will facilitate systematic grey literature searches in alignment with PRISMA 2020 guidelines, specifically targeting clinical guidelines using the PIC research question framework.

### 1.2 Scope

The application will be developed using a microservice architecture and LangChain framework to ensure scalability ,maintainability, and flexibility. It will serve Public Health Researchers who support guideline developer groups (GDGs).

### 1.3 Definitions, Acronyms, and Abbreviations

- **PRISMA**: Preferred Reporting Items for Systematic Reviews and Meta-Analyses
- **PIC**: Population, Interest, Context
- **GDGs**: Guideline Developer Groups

### 1.4 Systemtic Review of International Clinical Guidelines

- The application will be able to generate a PRISMA 2020-compliant report with the following Key Data Points Required:
  - Number of records found through each SERP API
  - Number of records removed during deduplication
  - Number of reports attempted to retrieve by either manually clicking on the link by the user or by the Web Crawling Service
  - Number of reports successfully/unsuccessfully retrieved
  - Total number assessed for eligibility by the user (toal number of incldue, exclude or maybe results)
  - Specific exclusion reasons and corresponding numbers of excluded reports

## 2. Overall Description

### 2.1 Product Perspective

The Grey Literature Search Engine is a standalone web application that will be developed using a microservice architecture. Each core functionality will be encapsulated within its own service, allowing for independent development and deployment.

### 2.2 Product Functions

- User Authentication and Management
- Dashboard for Search Management
- Search Configuration using PIC Framework
- Document Processing and Storage
- AI-driven Search Strategy Refinement
- Search Execution and Results Presentation
- PRISMA-Compliant Reporting

### 2.3 User Characteristics

The primary users are Public Health Researchers who need to systematically search and appraise existing guidelines using grey literature sources. For example, a researcher might need to search and identify all relevant clinical guidelines that address treatment of diabetes Type 2 (Interest) in adults (Population) in primary care settings (Context).

## 3. Specific Requirements

### 3.1 Functional Requirements

#### 3.1.1 Authentication Service

- Users can log in, create accounts, and reset passwords.
- Email authentication for enhanced security.

#### 3.1.2 User Dashboard Service

- Display options to start new searches or review past searches.
- Manage search history and provide options to refine or export results.

#### 3.1.3 Search Configuration Service

- Allow users to define search concepts using the PIC framework.
- Enable selection of SERP APIs and input of targeted URLs (these will be urls of domains for World Health Organization or www.who.int).
- Implement LangChain's prompt templates to structure user inputs for the AI model.
- Add an option for users to choose between SERP API results or web crawling.
- If web crawling is selected, then the URLs returned by the SERP APIs will be process by the Web Crawler Service.

#### 3.1.4 Document Processing Service

- Process uploaded documents using LangChain's document loaders for various file formats (PDFs, word docs, web pages, etc.).
- Urls returned by the SERP APIs that point directly to a document (for example, https://www.nice.org.uk/guidance/ng28/resources/type-2-diabetes-in-adults-management-pdf-1837338615493) will be downloaded automatically by the Document Processing Service and processed.
- Implement LangChain's text splitters to break down long documents into manageable chunks.
- Use LangChain's embedding models to convert text chunks into vector representations.
- Store processed data in a vector database optimized for semantic search.
- Implement entity extraction to identify key concepts from processed documents for knowledge graph population.
- Integrate a knowledge graph database (e.g., Neo4j) to store and manage extracted entities and relationships.
- Process crawled web content using LangChain's ScrapingAntLoader for efficient extraction and conversion to LLM-ready format.
- Implement entity extraction on crawled content to populate the knowledge graph with web-sourced information.

#### 3.1.5 Search Strategy Service

- Use LangChain's language models (LLMs) to suggest and refine search strategies.
- Leverage LangChain's output parsers to extract and structure AI-generated search strategies.
- Construct Boolean search strings based on user inputs and AI suggestions.
- Allow users to iterate with the AI Search Strategy Agent, refining strategies until satisfied.
- Utilize the knowledge graph to expand and refine search queries based on related entities and relationships.
- Implement query expansion techniques leveraging the knowledge graph structure.

#### 3.1.6 Search Execution Service

- Execute searches across selected APIs using LangChain's retrieval modules.
- Implement LangChain's agents to orchestrate complex search operations and adapt to intermediate results.
- Handle rate-limiting and manage parallel requests.
- Utilize LangChain's memory components to maintain context across multiple search iterations.
- Integrate knowledge graph-based query expansion when executing searches across selected SERP APIs.
- Implement result aggregation and deduplication based on entity recognition from the knowledge graph.

#### 3.1.7 Results Processing Service

- Implement LangChain's retrieval-augmented generation (RAG) techniques for context-aware ranking and presentation of search results.
- Create a pipeline using LangChain's chains for processing, ranking, and classifying search results.
- Allow users to classify results (incldue, exclude or maybe)and provide justifications.
- Use LangChain's evaluation tools to assess the quality and relevance of search results.
- Enable users to rerun searches if not satisfied with initial results by directing them to the Search Strategy Service to refine parameters.
- Integrate a knowledge graph-based ranking function that incorporates semantic relevance and authority scoring.
- Implement knowledge graph-based filters to ensure results match the specific PIC framework defined by the user.
- Utilize the knowledge graph for result aggregation and deduplication based on entity recognition.

#### 3.1.8 Reporting Service

- Generate PRISMA 2020-compliant reports.
- Provide options to export reports as PDFs.

#### 3.1.9 Web Crawler Service

- Implement ScrapingAntLoader from LangChain for efficient web crawling and content extraction.
- Handle anti-bot measures and JavaScript rendering for comprehensive content capture.
- Implement respectful crawling practices, including rate limiting and robots.txt adherence.
- Process extracted content through the Document Processing Service for consistent handling with other data sources.
- Integrate crawled data into the knowledge graph, enhancing the overall domain understanding.

### 3.2 Non-Functional Requirements

#### 3.2.1 Performance

- Each microservice should handle its specific tasks efficiently, ensuring quick response times.

#### 3.2.2 Scalability

- The application should be able to scale horizontally by adding more instances of microservices as needed.

#### 3.2.3 Security

- Ensure secure data transmission and storage.
- Implement robust authentication and authorization mechanisms.

#### 3.2.4 Maintainability

- Code should be modular and well-documented to facilitate easy updates and maintenance.

#### 3.2.5 Reliability

- The system should be resilient to failures, with mechanisms for error handling and recovery.
- Implement robust error handling for web crawling operations, including retry mechanisms for temporary failures.

## 4. System Architecture

### 4.1 Microservice Architecture

- The application will be divided into independent microservices, each responsible for a specific functionality.
- Use an API Gateway to manage requests and handle cross-cutting concerns like authentication and logging.

  4.2 Technology Stack
  Frontend: React.js or Angular
  Backend: Node.js with Express for microservices
  Database:

- MongoDB for document storage
- Neo4j for storing and querying the domain-specific knowledge graph
- Pinecone or Weaviate for vector database
  Containerization: Docker for deploying microservices
  Orchestration: Kubernetes for managing microservice deployments
  AI/ML:
- LangChain for natural language processing, search strategy refinement, and document processing
- LangChain's ScrapingAntLoader for web crawling and content extraction
  Search: Integration with multiple SERP APIs and web crawling capabilities

## 5. Appendices

### 5.1 Glossary

- **Microservice Architecture**: An architectural style that structures an application as a collection of loosely coupled services.
- **LangChain**: A framework for developing applications powered by language models, providing tools for document processing, embedding, and retrieval.
- **Knowledge Graph**: A structured representation of knowledge using a graph consisting of entities as nodes and relationships as edges.
- **Entity Extraction**: The process of identifying and classifying key elements from text into predefined categories.
- **Web Crawling**: The systematic browsing and data extraction from websites, used to gather information for search engines or data analysis.

### 5.2 References

- PRISMA 2020 Guidelines
- LangChain Documentation

Citations:
[1] https://www.bmj.com/content/372/bmj.n160 for PRISMA 2020 Guidelines explanation

Relevant documentation for each technology, including documentation and API links where available:

- LangChain
  -- Documentation: https://python.langchain.com/docs/introduction/
  -- API Reference: https://python.langchain.com/api_reference/index.html
- React
  -- Documentation: https://react.dev/
  -- API Reference: https://react.dev/reference/react
- Angular
  -- Documentation: https://angular.dev/
  -- API Reference: https://angular.dev/api
- Express.js
  -- Documentation: https://expressjs.com/en/guide/routing.html
  -- API Reference: https://expressjs.com/en/4x/api.html
- Node.js
  -- Documentation: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs
  -- API Reference: https://nodejs.org/docs/latest/api/
- MongoDB
  -- Documentation: https://www.mongodb.com/docs/manual/
  -- API Reference: https://www.mongodb.com/docs/manual/reference/stable-api/
- Neo4j
  -- Documentation: https://neo4j.com/docs/
  -- API Reference: https://neo4j.com/docs/api/python-driver/current/api.html
- Pinecone
  -- Documentation: https://docs.pinecone.io/
  -- API Reference: https://docs.pinecone.io/reference/api/introduction
- Docker
  -- Documentation: https://docs.docker.com/
  -- API Reference: https://docs.docker.com/reference/api/engine/
- Kubernetes
  -- Documentation: https://kubernetes.io/docs/home/
  -- API Reference: https://kubernetes.io/docs/reference/
