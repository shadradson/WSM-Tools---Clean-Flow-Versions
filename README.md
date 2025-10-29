# WSM Tools - Clean Flow Versions
The WSM Clean Flow Version tool provides a user-friendly screen flow interface to identify and delete:
- **Old Flow Versions**: Inactive versions of flows that are no longer needed
- **Flow Interview Records**: Failed or completed flow interview execution records
# WARNING
This tool PERMENANTLY deletes flow version and flow interviews. Do not use if you do not know what you are doing. We Summit Mountains holds no responsibility for negative consequences from using this tool. This tool is provided without warranty, guarentee, or any implicit responsibility. This tool mass deletes flows and flow interviews. You have been warned.

## Features
- **Two Main Functions**:
  1. **Clean Flow Versions**: Delete old, inactive versions of flows while protecting the active version
  2. **Clean Flow Interviews**: Remove flow interview execution records (useful for cleaning up paused or failed flow instances)


## Prerequisites
- Salesforce org (Sandbox, Developer, or Production)
- Salesforce CLI (sfdx) - if deploying manually
- API version 64.0 or higher

## Installation
### Quick Deploy (Recommended)
Click the button below to deploy directly to your Salesforce org:
[<img src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png" alt="Deploy to Salesforce">](https://githubsfdeploy.herokuapp.com?owner=shadradson&repo=WSM-Tools---Clean-Flow-Versions&ref=main)

### Manual Deployment
1. **Clone this repository**:
   ```bash
   git clone https://github.com/shadradson/WSM-Tools---Clean-Flow-Versions.git
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

## Usage
### Accessing the Flow
My reccomendation is to run this flow on a Lightning Flow Record Page as it helps with pre-selecting the correct flow to clean.

Alternatively, you can:
- Add the flow to a Flow Action in a utility bar
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
- **Backup Recommendation**: Always test in a Sandbox environment first
- **Active Versions**: The tool automatically protects active flow versions from deletion
- **Permissions**: Users need appropriate permissions to delete flow metadata
- **Flow Interviews**: Be cautious when deleting flow interviews - ensure they are no longer needed
- **Pre-filtering**: By default, the flow pre-filters for flows containing "WSM" - you can modify this in the flow definition

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

**Issue**: "You don't have access to this record"
- **Solution**: Ensure you have appropriate permissions to view and delete flow metadata

**Issue**: Active flow version appears in the deletion list
- **Solution**: This should not happen due to filtering. If it does, please do not delete it and report the issue

**Issue**: Flow interviews won't delete
- **Solution**: Some flow interviews may be locked or in a state that prevents deletion. Check the interview status

## Project Structure

```
WSM-Tools---Clean-Flow-Versions/
├── force-app/
│   └── main/
│       └── default/
│           └── flows/
│               └── WSM_SCR_TOOL_Clean_Flow_Version.flow-meta.xml
├── manifest/
│   └── package.xml
├── sfdx-project.json
└── README.md
```

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
