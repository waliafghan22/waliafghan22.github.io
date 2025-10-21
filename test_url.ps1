try {
    $response = Invoke-WebRequest -Uri "https://avatars.githubusercontent.com/u/waliafghan22" -Method Head -TimeoutSec 10
    Write-Host "Status: $($response.StatusCode)"
    Write-Host "Success: URL is accessible"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "URL may not be accessible"
}
