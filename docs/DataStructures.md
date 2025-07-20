# Data Structure and Ingestion

This document details the data structure for chat entries within the Thoughtless App and outlines how data from various sources will be ingested and managed.

## Core Data Structure

The core data structure for chat entries will capture the fundamental components of a conversation. The detailed structure will be significantly informed by the data format obtained from Google Takeout for Gemini chat history, as this is anticipated to be a primary source of historical data.

We anticipate the structure will include elements such as:

*   Unique identifier for each entry.
*   The content of the message or turn.
*   Timestamp of the entry.
*   Identifier for the sender (user, AI, etc.).
*   References to the conversation or thread the entry belongs to.

The specific fields and their types will be finalized after analyzing the Google Takeout export format to ensure efficient parsing and utilization of the data.

## Metadata for Ingestion

To track the origin and context of chat entries, the following metadata will be associated with each entry, regardless of the ingestion method:

*   `ingestion_method`: Specifies how the data was brought into the system. Examples:
    *   `manual`: Data entered directly by the user.
    *   `google_takeout`: Data imported from a Google Takeout export.
    *   `api_integration`: Data ingested via an external API.
    *   `file_import`: Data imported from a file in a specific format.
*   `source_type`: Indicates the specific source of the data within the ingestion method. Examples:
    *   `gemini_chat`: Chat history from Gemini.
    *   `user_input`: Direct user input.
    *   `external_api`: Data from a specific external service.
    *   `json_file`: Data from a JSON file import.
    *   `csv_file`: Data from a CSV file import.
*   `source_details`: A flexible field to store source-specific information that may be useful for context or debugging. Examples:
    *   For `google_takeout`: The name of the Takeout file or archive, specific identifiers within the Takeout data.
    *   For `manual`: A brief note about the context of the manual entry.
    *   For `api_integration`: API endpoint or identifier.
    *   For `file_import`: Original filename.
*   `ingestion_timestamp`: The timestamp when the data was ingested into the Thoughtless App system.

This metadata will be crucial for understanding the provenance of the data, enabling features like filtering, attribution, and analyzing data based on its source.

## Handling Different Ingestion Methods

The system will be designed to handle data from various ingestion methods by parsing the source data and mapping it to the core data structure while adding the appropriate metadata.

*   **Google Takeout:** The ingestion process will involve parsing the JSON structure provided by Google Takeout, extracting the relevant chat data, mapping it to the core data structure fields, and adding the `ingestion_method` as `google_takeout`, `source_type` as `gemini_chat`, and relevant `source_details`.
*   **Manual Input:** Data entered directly by the user will be captured, formatted according to the core data structure, and tagged with `ingestion_method` as `manual` and `source_type` as `user_input`.
*   **Future Integrations:** The ingestion framework will be extensible to accommodate future integrations with other AI models or data sources, ensuring that the appropriate parsing, mapping, and metadata tagging occur.

## Linking to this Document

This document is linked from the "Overall Architecture Overview" (`docs/OverallArchitectureOverview.md`) under the "Data Management" or a similar relevant section for easy access and comprehensive architectural understanding.
