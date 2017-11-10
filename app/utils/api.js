import axios from 'axios'

// See README for Github oAuth API Client access instruction
import { getGitHubSecrets } from '../../secrets/githubAPIConfig'
const {id, sec} = getGitHubSecrets()

// See React Fundamentals course video on Axios, Promises, and the Github API.
const params = `?client_id=${id}&client_secret=${sec}`


// axios returns promises

// ========== GitHub Battle =====================

// Get user's github data
async function getProfile(username) {
  const profile = await axios.get(`https://api.github.com/users/${username}${params}`)
  return profile.data
}

// Get user's github repos
function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

// Get user's total Github repos's stars
function getStarCount(repos) {
  return repos.reduce((count, {stargazers_count}) => (count + stargazers_count), 0)
}

// compute user's score (based on toy algo)
function calculateScore({followers}, repos) {
  return (followers * 3) + getStarCount(repos)
}

function handleError(error) {
  console.warn(error)
  return null
}

// Compose mini functions into a bigger one.
async function getUserData(player) {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ])
  return {
    profile,
    score: calculateScore(profile, repos),
  }
}

// who is the winner (sort descending score). Player 0 is winner. Player 1 is loser.
function sortPlayers(players) {
  return players.sort((a,b) => (b.score - a.score))
}

// battle!
export async function battle(players) {
    const results = await Promise.all(players.map(getUserData))
      .catch(handleError)
    return results ? sortPlayers(results) : results
}

// ========== get popular GitHub repository =====================
export async function fetchPopularRepos (language) {
  const encodedURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:`+
    `${language}&sort=stars&order=desc&type=Repositories`)

  const repos = await axios.get(encodedURI)
    .catch(handleError)

  return repos.data.items
}
