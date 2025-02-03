# Database Schemas

## MongoDB Collections

### Users Collection

```javascript
{
  _id: ObjectId,
  email: String,
  passwordHash: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
}
```

### SearchConfigurations Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  population: {
    description: String,
    keywords: [String],
    suggestedTerms: [String]
  },
  interest: {
    description: String,
    keywords: [String],
    suggestedTerms: [String]
  },
  context: {
    description: String,
    keywords: [String],
    suggestedTerms: [String]
  },
  targetUrls: [String],
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

### SearchResults Collection

```javascript
{
  _id: ObjectId,
  configurationId: ObjectId,
  results: [{
    url: String,
    title: String,
    snippet: String,
    source: String,
    classification: String,
    justification: String,
    processedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Reports Collection

```javascript
{
  _id: ObjectId,
  configurationId: ObjectId,
  searchResultId: ObjectId,
  metrics: {
    totalResults: Number,
    includedResults: Number,
    excludedResults: Number,
    maybeResults: Number
  },
  prismaReport: {
    flowDiagram: String,
    narrative: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Neo4j Graph Structure

### Node Labels and Properties

#### Guidelines

```cypher
CREATE (g:Guideline {
  id: String,
  title: String,
  url: String,
  publishDate: Date,
  version: String,
  status: String,
  lastUpdated: Date
})
```

#### Clinical Concepts

```cypher
CREATE (p:Population {
  id: String,
  name: String,
  description: String,
  characteristics: String[]
})

CREATE (d:Disease {
  id: String,
  name: String,
  icd10Code: String,
  description: String
})

CREATE (i:Intervention {
  id: String,
  name: String,
  type: String,
  description: String
})

CREATE (d:Diagnostic {
  id: String,
  name: String,
  type: String,
  description: String
})

CREATE (o:Outcome {
  id: String,
  name: String,
  type: String,
  measure: String,
  description: String
})
```

#### Organizational Entities

```cypher
CREATE (gd:Guideline_Developer {
  id: String,
  name: String,
  country: String,
  type: String,
  website: String
})

CREATE (c:Country {
  id: String,
  name: String,
  region: String,
  incomeLevel: String
})

CREATE (s:Setting {
  id: String,
  name: String,
  type: String,
  level: String
})

CREATE (hp:Healthcare_Professional {
  id: String,
  role: String,
  specialty: String,
  level: String
})
```

#### Evidence and Recommendations

```cypher
CREATE (t:Topic {
  id: String,
  name: String,
  category: String,
  description: String
})

CREATE (r:Recommendation {
  id: String,
  text: String,
  strength: String,
  direction: String
})

CREATE (el:Evidence_Level {
  id: String,
  level: String,
  description: String,
  framework: String
})

CREATE (s:Study {
  id: String,
  title: String,
  type: String,
  year: Integer
})

CREATE (sd:Study_Design {
  id: String,
  type: String,
  description: String
})
```

#### Implementation and Resources

```cypher
CREATE (ir:Implementation_Recommendation {
  id: String,
  text: String,
  context: String,
  barriers: String[],
  facilitators: String[]
})

CREATE (s:Stakeholder {
  id: String,
  type: String,
  role: String,
  influence: String
})

CREATE (ppi:Public_Patient_Involvement {
  id: String,
  type: String,
  level: String,
  description: String
})

CREATE (gv:Guideline_Version {
  id: String,
  version: String,
  date: Date,
  changes: String[]
})

CREATE (hr:Healthcare_Resource {
  id: String,
  type: String,
  description: String,
  availability: String
})

CREATE (c:Cost {
  id: String,
  type: String,
  amount: Float,
  currency: String,
  year: Integer
})

CREATE (tm:Training_Material {
  id: String,
  type: String,
  format: String,
  url: String
})

CREATE (cs:Clinical_Situation {
  id: String,
  description: String,
  severity: String,
  urgency: String
})

CREATE (pp:Patient_Preference {
  id: String,
  type: String,
  description: String,
  context: String
})
```

### Relationships

#### Guideline Development

```cypher
CREATE (g:Guideline)-[:DEVELOPED_BY {
  date: Date,
  role: String
}]->(gd:Guideline_Developer)

CREATE (g:Guideline)-[:ADOPTED_BY {
  date: Date,
  modifications: String[]
}]->(c:Country)

CREATE (g:Guideline)-[:ADAPTED_BY {
  date: Date,
  changes: String[]
}]->(c:Country)

CREATE (g:Guideline)-[:CONTEXTUALISED_BY {
  date: Date,
  context: String
}]->(c:Country)

CREATE (g:Guideline)-[:CONDUCTED_DE_NOVO_BY {
  date: Date
}]->(gd:Guideline_Developer)
```

#### Clinical Content

```cypher
CREATE (g:Guideline)-[:TARGETS_POPULATION {
  relevance: Float,
  specificity: String
}]->(p:Population)

CREATE (g:Guideline)-[:ADDRESSES_DISEASE {
  focus: String,
  scope: String
}]->(d:Disease)

CREATE (r:Recommendation)-[:RECOMMENDS_INTERVENTION {
  strength: String,
  condition: String
}]->(i:Intervention)

CREATE (r:Recommendation)-[:OUTCOME_FOCUSED_ON {
  importance: String,
  measurement: String
}]->(o:Outcome)

CREATE (i:Intervention)-[:IMPACTS_OUTCOME {
  effect: String,
  magnitude: Float,
  certainty: String
}]->(o:Outcome)
```

#### Evidence and Support

```cypher
CREATE (r:Recommendation)-[:HAS_EVIDENCE_LEVEL {
  assessment_date: Date
}]->(el:Evidence_Level)

CREATE (s:Study)-[:HAS_STUDY_DESIGN]->(sd:Study_Design)

CREATE (s:Study)-[:SUPPORTS_EVIDENCE {
  strength: String,
  relevance: Float
}]->(r:Recommendation)
```

#### Implementation Context

```cypher
CREATE (g:Guideline)-[:IMPLEMENTED_IN {
  date: Date,
  status: String
}]->(s:Setting)

CREATE (g:Guideline)-[:CONSIDERS_PATIENT_CRITERIA {
  importance: String
}]->(pp:Patient_Preference)

CREATE (ir:Implementation_Recommendation)-[:SUPPORTS_IMPLEMENTATION {
  relevance: Float,
  feasibility: String
}]->(g:Guideline)

CREATE (s:Stakeholder)-[:CONTRIBUTES_TO {
  role: String,
  impact: String
}]->(g:Guideline)

CREATE (g:Guideline)-[:HAS_TRAINING_MATERIALS]->(tm:Training_Material)

CREATE (g:Guideline)-[:ASSESSES_COST {
  perspective: String,
  timeframe: String
}]->(c:Cost)

CREATE (g:Guideline)-[:HAS_CLINICAL_SITUATION]->(cs:Clinical_Situation)

CREATE (pp:Patient_Preference)-[:INFLUENCES_DECISION {
  strength: String,
  context: String
}]->(r:Recommendation)

CREATE (g:Guideline)-[:HAS_VERSION]->(gv:Guideline_Version)
```

## Vector Database Schema

### Document Embeddings

```javascript
{
  id: String,
  vector: Float[384], // Dimension depends on embedding model
  metadata: {
    documentId: String,
    source: String,
    type: String,
    timestamp: Date
  }
}
```

### Search Queries

```javascript
{
  id: String,
  vector: Float[384],
  metadata: {
    configurationId: String,
    component: String, // population, interest, or context
    timestamp: Date
  }
}
```

## Migration Strategy

### Version Control

- Use semantic versioning for schema changes
- Maintain migration scripts
- Document breaking changes

### Backup Policy

- Daily automated backups
- Pre-migration backups
- Retention policy: 30 days

### Migration Process

1. Create backup
2. Apply schema changes
3. Migrate data
4. Verify integrity
5. Update application version
