# reading-todo

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0f1a98c217314d70a26c537a69e9daad)](https://www.codacy.com/manual/ammarnajjar/reading-todo?utm_source=github.com&utm_medium=referral&utm_content=ammarnajjar/reading-todo&utm_campaign=Badge_Grade)

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

- Using [tilt](https://tilt.dev/):

  - Deploy:

    ```bash
    tilt up --no-browser --hud=false --watch=false
    ```

  - Access to client:

    ```bash
    kubectl port-forward deployment/client 3300:80
    ```

- Using [direnv](https://github.com/direnv/direnv):

  Source the `.envrc` file which adds some scripts to the `PATH`

  ```bash
  ci        # => run ci pipeline

  compose   # => docker-compose locally

  cicd      # => run ci pipeline then compose

  deploy    # => deploy to kubernetes locally
  ```

### Browse the deployment

- Docs: [localhost:3100](http://localhost:3100/)
- Dev: [localhost:3200](http://localhost:3200/)
- Prod: [localhost:3300](http://localhost:3300/)
