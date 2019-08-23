# reading-todo

An app to manage a reading todo list

I am starting this maily for educational purposes.

## Development:

### Build and Run

- Using [Ansible](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html):

  This will create a python3 virtual environment and run ansible playbook inside of it.

  ```bash
  ansible/play ansible/playbook.yml -i ansible/hosts.yml
  ```

- Using [docker-compose](https://docs.docker.com/compose/):

  ```bash
  docker-compose up --build
  ```

- Using [direnv](https://github.com/direnv/direnv):

  Source the `.envrc` file which adds some scripts to the `PATH`

  ```bash
  ci		# => run ci pipeline

  deploy	# => deploy locally

  cicd	# => run ci pipeline then deploy locally
  ```

### Browse the deployment

- Docs: [localhost:3100/](http://localhost:3100/)
- Dev: [localhost:3200/](http://localhost:3200/)
- Prod: [localhost:3300/](http://localhost:3300/)
