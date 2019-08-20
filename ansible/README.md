## Ansible Playbook

The roles are:

- python-deps:

To install the ansible docker-compose dependencies.

- client:

To run the client service in the context of docker-compose.

### Run the Playbook

- If you don't want to install the dependencies globally, activate a python virtual environment:

```bash
python3 -m venv venv && source venv/bin/activate
```

- Play the playbook

```bash
ansible-playbook playbook.yml -i hosts.yml
```

- Play single role, CI pipeline for example

```bash
ansible-playbook playbook.yml -i hosts.yml --tags "ci"
```
