const username = process.argv[2];
const userUrl = `https://api.github.com/users/${username}`;
const eventsUrl = `https://api.github.com/users/${username}/events`;

fetch(userUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('This user does not exist');
    }
    // return response.json();
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

let events = [];

fetch(eventsUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // console.log(data.length);
    data.forEach(d => {
        // console.log(d.type);
        // console.log(d.repo['name']);

        let message = '';
        if (d.type === 'PushEvent') {
          message = `Commit pushed to ${d.repo['name']}`;
          // console.log(message);
        } else if (d.type === 'IssuesEvent') {
          message = `Issue created for ${d.repo['name']}`;
          // console.log(message);
        } else if (d.type === 'PublicEvent') {
          message = `${d.repo['name']} is now public`;
        } else if (d.type === 'CreateEvent') {
          message = `${d.repo['name']} created`;
          // console.log(message);
        } else if (d.type === 'DeleteEvent') {
          message = `Branch deleted in ${d.repo['name']}`;
          // console.log(message);
        } else if (d.type === 'PullRequestEvent') {
          message = `Pull request created for ${d.repo['name']}`;
          // console.log(message);
        }
        events.push(message);

        // let repoName = d.repo['name'];
        // console.log(d.type);
        // events[repoName] = push(d.type);
    });
    events.forEach(message => console.log(message));
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
