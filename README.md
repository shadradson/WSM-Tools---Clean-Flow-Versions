# WSM Tools - Clean Flow Versions

A Salesforce Screen Flow tool designed to help administrators and developers clean up old flow versions and failed flow interviews from their Salesforce org. This tool provides an easy-to-use interface for managing flow metadata and maintaining a clean, performant Salesforce environment.

> **Important**: This flow requires the [Flow Screen Components Basepacks](https://unofficialsfdc.com/flow-screen-components/) to be installed in your org before deployment. See the [Prerequisites](#prerequisites) section for installation instructions.

## Overview

As Salesforce Flows evolve through development and production use, old inactive versions and failed interview records can accumulate in your org. This can lead to:
- Increased metadata storage usage
- Slower metadata API operations
- Difficulty navigating flow versions in the UI
- Confusion about which flow versions are actually in use

The WSM Clean Flow Version tool provides a user-friendly screen flow interface to identify and delete:
- **Old Flow Versions**: Inactive versions of flows that are no longer needed
- **Flow Interview Records**: Failed or completed flow interview execution records

## Features

- **Two Main Functions**:
  1. **Clean Flow Versions**: Delete old, inactive versions of flows while protecting the active version
  2. **Clean Flow Interviews**: Remove flow interview execution records (useful for cleaning up paused or failed flow instances)

- **User-Friendly Interface**:
  - Interactive data tables with search functionality
  - Multi-select capability for bulk deletion
  - Automatic filtering to prevent deletion of active flow versions
  - Pre-selected filtering for flows containing "WSM" in their name/API name

- **Safety Features**:
  - Active flow versions are automatically filtered out and cannot be deleted
  - Minimum selection requirements prevent accidental empty deletions
  - Visual confirmation screens before deletion
  - Runs in System Mode Without Sharing for proper permissions

## Prerequisites

- Salesforce org (Sandbox, Developer, or Production)
- Salesforce CLI (sfdx) - if deploying manually
- API version 64.0 or higher
- **REQUIRED**: Flow Button Bar component (`c:fsc_flowButtonBar`) - This is an external dependency from the [Flow Screen Components Basepacks](https://unofficialsfdc.com/flow-screen-components/). You must install this component separately before deploying this flow.

## Installation

### Step 1: Install Prerequisites

**IMPORTANT**: Before installing this flow, you must first install the Flow Screen Components Basepacks, which includes the required `fsc_flowButtonBar` component.

**Option A - Install via URL (Recommended)**:
Visit the [Flow Screen Components Basepacks](https://unofficialsfdc.com/flow-screen-components/) website and follow the installation instructions.

**Option B - Install from GitHub**:
```bash
# Clone the Flow Screen Components repository
git clone https://github.com/alexed1/LightningFlowComponents.git
cd LightningFlowComponents

# Deploy the Flow Button Bar component to your org
sfdx force:source:deploy -p flow_screen_components/flowButtonBar -u YourOrgAlias
```

### Step 2: Deploy WSM Clean Flow Tool

#### Quick Deploy (Recommended)

Click the button below to deploy directly to your Salesforce org:

[<img src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png" alt="Deploy to Salesforce">](https://githubsfdeploy.herokuapp.com?owner=WeSummitMountains&repo=WSM-Tools---Clean-Flow-Versions&ref=main)

#### Manual Deployment

1. **Clone this repository**:
   ```bash
   git clone https://github.com/WeSummitMountains/WSM-Tools---Clean-Flow-Versions.git
   cd WSM-Tools---Clean-Flow-Versions
   ```

2. **Authenticate to your Salesforce org**:
   ```bash
   sfdx auth:web:login -a MyOrgAlias
   ```

3. **Deploy to your org**:
   ```bash
   sfdx force:source:deploy -p force-app -u MyOrgAlias
   ```

   Or using the manifest:
   ```bash
   sfdx force:source:deploy -x manifest/package.xml -u MyOrgAlias
   ```

### Deploy and Modify

1. Fork this repository to your GitHub account
2. Clone your forked repository
3. Connect to your target Salesforce org (Sandbox or Production)
4. Make desired modifications
5. Deploy using the Salesforce CLI or your preferred deployment method

## Usage

### Accessing the Flow

1. Navigate to **Setup** in your Salesforce org
2. Search for **Flows** in the Quick Find box
3. Find and click on **WSM - SCR - TOOL: Clean Flow Version**
4. Click **Run** to launch the flow

Alternatively, you can:
- Add the flow to a Flow Action in a utility bar
- Create a custom button or link to launch the flow
- Include it in a Lightning App page

### Using the Flow

#### Option 1: Clean Flow Versions

1. Launch the flow and select **Clean Flow Versions**
2. The flow will display a list of flows (pre-filtered for flows containing "WSM")
3. Select the flow you want to clean
4. Review the list of inactive flow versions (Active version is automatically filtered out)
5. Select the versions you want to delete (minimum 1 required)
6. Click **Finish** to delete the selected versions

#### Option 2: Clean Flow Interviews

1. Launch the flow and select **Clean Flow Interviews**
2. The flow will display all flow interview records in your org
3. Use the search bar to find specific interviews by label, flow name, or error message
4. Select the interview records you want to delete (minimum 1 required)
5. Click **Finish** to delete the selected interviews

## Technical Details

### Flow Components

- **API Version**: 64.0
- **Process Type**: Screen Flow
- **Run Mode**: System Mode Without Sharing
- **Status**: Active

### Flow Structure

1. **Entry Point**: Function selection screen
2. **Decision Logic**: Routes user to either Clean Flow Versions or Clean Flow Interviews path
3. **Record Lookups**: Queries FlowRecord, FlowRecordVersion, and FlowInterview objects
4. **Filtering**: Collection processor to remove active versions from deletion candidates
5. **Data Tables**: Interactive screens for record selection
6. **Record Deletion**: Bulk delete selected records

### Objects Used

- **FlowRecord**: Represents flow definitions
- **FlowRecordVersion**: Represents specific versions of flows
- **FlowInterview**: Represents flow execution instances (paused or failed)

### Custom Components

- **fsc_flowButtonBar** (`c:fsc_flowButtonBar`): External Lightning component for navigation buttons (must be installed separately - see Prerequisites)
- **flowruntime:datatable**: Standard flow data table component (built-in to Salesforce)

## Important Notes

- **Backup Recommendation**: Always test in a Sandbox environment first
- **Active Versions**: The tool automatically protects active flow versions from deletion
- **Permissions**: Users need appropriate permissions to delete flow metadata (see Permissions section below)
- **Flow Interviews**: Be cautious when deleting flow interviews - ensure they are no longer needed
- **Pre-filtering**: By default, the flow pre-filters for flows containing "WSM" - you can modify this in the flow definition
- **No Undo**: Deleted flow versions and interviews cannot be recovered - always verify your selections before proceeding

## Permissions Required

To use this tool, users need the following permissions:

### Object Permissions
- **FlowRecord**: Read access
- **FlowRecordVersion**: Read and Delete access
- **FlowInterview**: Read and Delete access

### System Permissions
One of the following:
- **View All Data** and **Modify All Data** (System Administrator)
- **Manage Flow** permission
- Custom permission set with the object permissions listed above

### Notes on Permissions
- The flow runs in **System Mode Without Sharing**, which means it can access records regardless of sharing rules
- However, users still need object-level permissions to read and delete the records
- If users get "Insufficient Access" errors, ensure they have the required permissions above

## Configuration

### Customizing the Flow Filter

The flow currently pre-filters for flows containing "WSM" in the Name, ApiName, or FlowLabel fields. To modify this:

1. Edit the flow in Flow Builder
2. Find the **All_Flows** record lookup element
3. Modify the filter criteria to match your naming convention
4. Save and activate the flow

### Removing Pre-selection

To allow selection of all flows without pre-filtering:

1. Edit the flow in Flow Builder
2. Locate the **All_Flows** element (line 135-177 in the XML)
3. Remove or modify the filter logic as needed
4. Save and activate

## Troubleshooting

### Common Issues

**Issue**: "Unknown component c:fsc_flowButtonBar" or flow fails to activate
- **Solution**: You need to install the Flow Screen Components Basepacks first. See the Prerequisites section above.

**Issue**: "You don't have access to this record"
- **Solution**: Ensure you have appropriate permissions to view and delete flow metadata. You may need Modify All Data or Manage Flow permissions.

**Issue**: Active flow version appears in the deletion list
- **Solution**: This should not happen due to filtering. If it does, please do not delete it and report the issue as a bug.

**Issue**: Flow interviews won't delete
- **Solution**: Some flow interviews may be locked or in a state that prevents deletion. Check the interview status and ensure there are no active or paused interviews that should be resumed.

**Issue**: "Insufficient access" error when running the flow
- **Solution**: The flow runs in System Mode Without Sharing, but users still need View All Data permission or appropriate profile/permission set to access FlowRecord, FlowRecordVersion, and FlowInterview objects.

## Project Structure

```
WSM-Tools---Clean-Flow-Versions/
├── .forceignore                    # Salesforce deployment ignore file
├── .sfdx/                          # SFDX cache and metadata
│   └── tools/
│       └── soqlMetadata/           # Standard object metadata cache
├── config/
│   └── project-scratch-def.json   # Scratch org definition
├── force-app/
│   └── main/
│       └── default/
│           └── flows/
│               └── WSM_SCR_TOOL_Clean_Flow_Version.flow-meta.xml  # Main flow
├── manifest/
│   └── package.xml                 # Deployment manifest
├── sfdx-project.json               # SFDX project configuration
└── README.md                       # This file
```

### Repository Contents

- **Flow**: 1 Screen Flow (WSM_SCR_TOOL_Clean_Flow_Version)
- **API Version**: Flow uses 64.0, project configured for 65.0
- **Dependencies**: Requires external fsc_flowButtonBar component
- **No Apex Code**: This is a pure Flow-based solution with no custom Apex

## Contributing

Contributions are welcome! If you'd like to improve this tool:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Test thoroughly in a Salesforce Sandbox
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/YourFeature`)
7. Open a Pull Request

## Author

**We Summit Mountains**

## License

This project is provided as-is for use in Salesforce environments. Please test thoroughly before using in production.

## Resources

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
- [Flow Documentation](https://help.salesforce.com/s/articleView?id=sf.flow.htm&type=5)

## Support

For issues, questions, or suggestions:
- Open an issue in this repository
- Contact We Summit Mountains

---

**Note**: This tool operates on Salesforce metadata. Always test in a non-production environment first and ensure you have proper backups before performing bulk deletions.
