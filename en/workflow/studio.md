# Workflow Studio & Execution

TestNet uses a contract-driven **vNext DAG Workflow Engine**, allowing security engineers to rapidly create, validate, and execute complex automated pipelines via a highly interactive online code editor (**FlowEditor**).

---

## 1. Creating & Importing Workflows

Navigate to **"Workflow Management" -> "Workflow List"** to manage pipelines through several convenient paths:

1. **New from Scratch**: Click **"New Workflow"** in the top right to generate a clean YAML template containing essential DAG control flow blocks (e.g., Target Input -> Subdomain Enumeration -> Vulnerability Probing).
2. **Install from Registry Store**: Click **"Store Drawer (StoreDrawer)"** to browse the remote/builtin store (`testnet-registry`) and install verified, production-ready workflows with a single click.
3. **Local YAML Import/Export**: Directly upload existing `.yaml` specification files from your desktop or export your active pipelines to share across teams.

---

## 2. Online Editor & Live Schema Validation

At the heart of the workflow studio is **FlowEditor**, an advanced code editor offering IDE-grade diagnostics and real-time schema validation:

::: info [Image Placeholder: FlowEditor Online YAML Editing & Live Schema Diagnostic Panel]
:::

### Real-Time Dependency & Syntax Diagnostics
As you type, TestNet's `VNextDslValidator` checks your YAML specification against schema boundaries over WebSocket/HTTP:
- **Circular Dependency Detection**: Instantly warns if `dependsOn` structures form an infinite cycle (e.g., Step A depends on B, while B depends on A);
- **Dataflow Reference Checks**: Verifies parameter mappings (`inputs.targetDomain.from: "subdomain-enum.output.domains"`) against parent tool outputs to catch missing keys early;
- **Auto-completion**: Suggests available `toolId` names and parameter schemas derived from your installed Tool definitions.

### Verification Panel (VerifyPanel)
Click **"Verify & Preview"** at the bottom of the editor to slide out the interactive `VerifyPanel`:
- **DAG Execution Tree**: Transforms raw YAML into a clear visual sequence of step cards, illustrating execution orders, parallel branches, and synchronization barriers;
- **Error Jump**: If validation errors occur, the panel lists exact line numbers and clear descriptions. Clicking any error card immediately jumps the editor cursor to the problematic line.

---

## 3. Instant Execution & Parameter Configuration

Once validation passes without errors, click **"Run Now"** at the top bar to trigger the execution engine.

### Target Inputs & Context Injection
An **Execution Modal (ExecuteTestModal)** opens, prompting you to define the target scope:
- **Manual Input**: Directly enter target companies, primary domains (e.g., `testnet-project.com`), or CIDR IP ranges into the text box;
- **Asset Graph Linkage**: Select targets straight from your existing [Asset Topology Graph](/en/assets/graph). TestNet's `TargetResolverEngine` automatically extracts related domain and IP arrays, injecting them cleanly into the execution context (`inputs`).

### Task Dispatch & Node Load Balancing
Upon confirmation, the backend `WorkflowRunEngine` compiles the pipeline into an **Execution Envelope**:
- Tasks are split into fine-grained execution units (`Task`) and dispatched to healthy, authorized [Go Scanning Nodes](/en/client/overview);
- For multi-branch DAG workflows, the `TaskDispatcherService` automatically balances workloads across multiple distributed nodes for maximum scanning throughput.
