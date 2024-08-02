
<h1>Telegram SSO Plugin Settings</h1>
<form action="/admin/plugins/telegram-sso/save" method="post">
    <div class="form-group">
        <label for="botToken">Telegram Bot Token</label>
        <input type="text" class="form-control" name="botToken" id="botToken" value="<%= botToken %>">
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
</form>
